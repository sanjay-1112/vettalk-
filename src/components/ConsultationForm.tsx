"use client";

import React, { useState, useEffect } from "react";
import {
  PawPrint,
  User,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  Upload,
  CheckCircle,
  Loader2,
  X,
  FileImage,
} from "lucide-react";
import {
  ConsultationFormData,
  PetType,
  PetGender,
  ProblemDuration,
} from "@/types/consultation";

interface ConsultationFormProps {
  initialConcern?: string;
  onSuccess: (data: {
    referenceId: string;
    ownerName: string;
    ownerPhone?: string;
    petName: string;
    petType: string;
    petAge?: string;
    mainConcern: string;
  }) => void;
}

export function ConsultationForm({
  initialConcern = "",
  onSuccess,
}: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    owner_name: "",
    mobile_number: "",
    city: "",
    pet_name: "",
    pet_type: "Dog",
    breed: "",
    pet_age: "",
    pet_gender: "Male",
    main_concern: initialConcern,
    problem_duration: "Today",
    disclaimer_accepted: false,
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Capture UTM parameters from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setFormData((prev) => ({
        ...prev,
        utm_source: searchParams.get("utm_source") || prev.utm_source,
        utm_medium: searchParams.get("utm_medium") || prev.utm_medium,
        utm_campaign: searchParams.get("utm_campaign") || prev.utm_campaign,
        utm_content: searchParams.get("utm_content") || prev.utm_content,
      }));
    }
  }, []);

  // Update main concern if initialConcern changes from parent
  useEffect(() => {
    if (initialConcern) {
      setFormData((prev) => ({ ...prev, main_concern: initialConcern }));
    }
  }, [initialConcern]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.owner_name.trim()) {
      newErrors.owner_name = "Owner name is required";
    }

    // Indian mobile number validation: 10 digits
    const cleanedPhone = formData.mobile_number.replace(/\D/g, "");
    if (!cleanedPhone) {
      newErrors.mobile_number = "Mobile number is required";
    } else if (cleanedPhone.length < 10) {
      newErrors.mobile_number = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.pet_name.trim()) {
      newErrors.pet_name = "Pet name is required";
    }

    if (!formData.main_concern.trim()) {
      newErrors.main_concern = "Please describe what is happening with your pet";
    } else if (formData.main_concern.trim().length < 5) {
      newErrors.main_concern = "Please provide a little more detail (at least 5 characters)";
    }

    if (!formData.disclaimer_accepted) {
      newErrors.disclaimer_accepted = "You must acknowledge the medical disclaimer to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type: jpeg, png, webp
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        file: "Only JPG, PNG, or WebP images are allowed",
      }));
      return;
    }

    // Validate size: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        file: "Image size must be less than 5MB",
      }));
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.file;
      return copy;
    });

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      // Scroll to the first error
      const firstErrorEl = document.querySelector(".border-rose-500");
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          payload.append(key, String(val));
        }
      });

      if (selectedFile) {
        payload.append("file", selectedFile);
      }

      const response = await fetch("/api/consultations", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to create consultation request. Please try again.");
      }

      onSuccess({
        referenceId: result.data.reference_id,
        ownerName: formData.owner_name,
        ownerPhone: formData.mobile_number,
        petName: formData.pet_name,
        petType: formData.pet_type,
        petAge: formData.pet_age,
        mainConcern: formData.main_concern,
      });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="consult-form" className="w-full scroll-mt-20">
      <div className="rounded-2xl border border-teal-100 bg-white p-5 sm:p-7 shadow-sm">
        <div className="border-b border-slate-100 pb-4 mb-5 flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Immediate Case Intake
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Consult a Vet Now
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Takes 1 minute &middot; Reach doctor on WhatsApp immediately after
            </p>
          </div>
          <div className="text-right shrink-0 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 shadow-2xs">
            <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Fee
            </span>
            <span className="text-base font-black text-emerald-700">₹100</span>
          </div>
        </div>

        {submitError && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to submit request</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: OWNER INFORMATION */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <User className="h-4 w-4 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">Owner Information</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Owner Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.owner_name}
                  onChange={(e) =>
                    setFormData({ ...formData, owner_name: e.target.value })
                  }
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 ${
                    errors.owner_name
                      ? "border-rose-500 bg-rose-50/30 ring-1 ring-rose-500"
                      : "border-slate-200 bg-slate-50/50 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  }`}
                />
                {errors.owner_name && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.owner_name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={formData.mobile_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobile_number: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      className={`w-full rounded-xl border pl-11 pr-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 ${
                        errors.mobile_number
                          ? "border-rose-500 bg-rose-50/30 ring-1 ring-rose-500"
                          : "border-slate-200 bg-slate-50/50 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                      }`}
                    />
                  </div>
                  {errors.mobile_number && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600">
                      {errors.mobile_number}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, Mumbai"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: PET INFORMATION */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <PawPrint className="h-4 w-4 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">Pet Information</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pet Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bruno, Bella"
                    value={formData.pet_name}
                    onChange={(e) =>
                      setFormData({ ...formData, pet_name: e.target.value })
                    }
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 ${
                      errors.pet_name
                        ? "border-rose-500 bg-rose-50/30 ring-1 ring-rose-500"
                        : "border-slate-200 bg-slate-50/50 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                    }`}
                  />
                  {errors.pet_name && (
                    <p className="mt-1 text-[11px] font-medium text-rose-600">
                      {errors.pet_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pet Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Dog", "Cat", "Other"] as PetType[]).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, pet_type: type })}
                        className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                          formData.pet_type === type
                            ? "border-teal-600 bg-teal-50 text-teal-800 ring-1 ring-teal-600"
                            : "border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Breed <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Labrador, Indie"
                    value={formData.breed}
                    onChange={(e) =>
                      setFormData({ ...formData, breed: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age <span className="text-slate-400 font-normal">(e.g. 2 yrs, 4 mos)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 years"
                    value={formData.pet_age}
                    onChange={(e) =>
                      setFormData({ ...formData, pet_age: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.pet_gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pet_gender: e.target.value as PetGender,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm outline-none transition-all focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: MAIN CONCERN & DURATION */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-800">
              <Clock className="h-4 w-4 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">Main Concern</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Describe what is happening <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Tap below to auto-fill</span>
                </div>

                {/* Quick pick chips */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {[
                    "Not eating",
                    "Vomiting / loose motions",
                    "Skin itching / rash",
                    "Lethargic / low energy",
                    "Diet question",
                  ].map((symptom) => (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          main_concern: prev.main_concern
                            ? `${prev.main_concern}, ${symptom}`
                            : symptom,
                        }))
                      }
                      className="rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200/70 px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors"
                    >
                      + {symptom}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  placeholder="Please briefly describe what is happening with your pet."
                  value={formData.main_concern}
                  onChange={(e) =>
                    setFormData({ ...formData, main_concern: e.target.value })
                  }
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 ${
                    errors.main_concern
                      ? "border-rose-500 bg-rose-50/30 ring-1 ring-rose-500"
                      : "border-slate-200 bg-slate-50/50 focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                  }`}
                />
                {errors.main_concern && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">
                    {errors.main_concern}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  When did the problem start?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      "Today",
                      "Yesterday",
                      "2-3 days ago",
                      "More than 3 days ago",
                      "Not sure",
                    ] as ProblemDuration[]
                  ).map((duration) => (
                    <button
                      type="button"
                      key={duration}
                      onClick={() =>
                        setFormData({ ...formData, problem_duration: duration })
                      }
                      className={`rounded-xl py-2 px-2 text-xs font-semibold border transition-all text-center ${
                        formData.problem_duration === duration
                          ? "border-teal-600 bg-teal-50 text-teal-800 ring-1 ring-teal-600"
                          : "border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* PHOTO UPLOAD (OPTIONAL) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Pet Photo <span className="text-slate-400 font-normal">(Optional, max 5MB)</span>
                </label>

                {!filePreview ? (
                  <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-4 cursor-pointer hover:bg-teal-50/30 hover:border-teal-300 transition-all">
                    <Upload className="h-6 w-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-teal-700">
                      Tap to select a photo of your pet / symptom
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      JPG, PNG, WebP up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl border border-teal-200 bg-teal-50/40 p-3 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={filePreview}
                      alt="Pet preview"
                      className="h-14 w-14 rounded-lg object-cover border border-teal-200 shadow-2xs"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {selectedFile?.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {((selectedFile?.size || 0) / 1024).toFixed(0)} KB &middot; Ready to upload
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {errors.file && (
                  <p className="mt-1 text-[11px] font-medium text-rose-600">{errors.file}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: SAFETY DISCLAIMER CHECKBOX */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.disclaimer_accepted}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    disclaimer_accepted: e.target.checked,
                  })
                }
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-xs leading-relaxed text-slate-600">
                I understand that online consultation does not replace emergency/in-person veterinary care where clinically required.
              </span>
            </label>
            {errors.disclaimer_accepted && (
              <p className="mt-1 text-[11px] font-medium text-rose-600">
                {errors.disclaimer_accepted}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 px-4 text-base font-bold text-white shadow-md shadow-teal-600/30 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Connecting to Veterinarian...</span>
              </>
            ) : (
              <span>Continue to Vet Consultation</span>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-400">
            Consultation fee starts at ₹100 &middot; Payable via UPI after consultation
          </p>
        </form>
      </div>
    </div>
  );
}
