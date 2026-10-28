"use client";

import React from "react";
import {
  Award,
  CheckCircle,
  Stethoscope,
  Star,
  FileCheck2,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export interface DoctorInfo {
  name: string;
  degree: string;
  title: string;
  experienceYears: number;
  councilName: string;
  licenseNo: string;
  petsTreatedCount: string;
  rating: string;
  specializations: string[];
  quote: string;
}

export const DEFAULT_DOCTOR: DoctorInfo = {
  name: "Dr. R. Soni",
  degree: "B.V.Sc & A.H.",
  title: "Senior Consultant Veterinarian",
  experienceYears: 15,
  councilName: "Telangana State Veterinary Council (TSVC)",
  licenseNo: "TSVC/02330/2024",
  petsTreatedCount: "12,000+",
  rating: "4.9 / 5",
  specializations: [
    "Canine & Feline Internal Medicine",
    "Gastrointestinal Triage (Vomiting & Diarrhea)",
    "Dermatology, Ear Infections & Allergies",
    "Puppy & Kitten Pediatric Care",
    "Pet Nutrition & Weight Management",
    "Senior Dog & Cat Care Guidance",
  ],
  quote:
    "As a practicing vet for over 15 years, I know how frightening it is when your dog or cat suddenly stops eating, vomits, or cries in pain. On VetTalk 24*7, I personally review your pet's symptoms on WhatsApp to guide you with honesty — explaining what home care helps and when an emergency hospital visit is essential.",
};

interface DoctorProfileCardProps {
  doctor?: DoctorInfo;
}

export function DoctorProfileCard({ doctor = DEFAULT_DOCTOR }: DoctorProfileCardProps) {
  return (
    <div className="w-full">
      <div className="rounded-2xl border-2 border-teal-200/90 bg-white shadow-md shadow-teal-900/5 overflow-hidden">
        {/* DOCTOR BANNER HEADER */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 p-5 text-white relative">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/30 backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>On-Call 24*7</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Doctor Photo / Icon Frame */}
            <div className="relative shrink-0">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/10 text-white border-2 border-white/30 shadow-inner">
                <Stethoscope className="h-9 w-9 sm:h-11 sm:w-11 text-teal-100" />
              </div>
              <div
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-teal-800"
                title="Verified Licensed Veterinarian"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Doctor Titles */}
            <div className="flex-1 min-w-0 pr-16 sm:pr-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200 block mb-0.5">
                On-Duty Veterinarian
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5 flex-wrap">
                {doctor.name}
                <span className="text-xs font-semibold text-teal-200 font-normal">
                  ({doctor.degree})
                </span>
              </h2>
              <p className="text-xs text-teal-100 font-medium mt-0.5">
                {doctor.title} &middot; {doctor.experienceYears}+ Yrs Exp.
              </p>
            </div>
          </div>
        </div>

        {/* OFFICIAL GOVERNMENT REGISTRATION SEAL */}
        <div className="bg-teal-50/80 px-4 py-2.5 border-b border-teal-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-teal-950 font-semibold">
            <FileCheck2 className="h-4 w-4 text-teal-700 shrink-0" />
            <span>{doctor.councilName}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Reg. No:
            </span>
            <span className="font-mono text-xs font-black text-teal-900 bg-white px-2 py-0.5 rounded border border-teal-200 shadow-2xs">
              {doctor.licenseNo}
            </span>
          </div>
        </div>

        {/* CLINICAL STATS GRID */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-white py-3 text-center">
          <div className="px-2">
            <p className="text-lg sm:text-xl font-black text-teal-800">
              {doctor.experienceYears}+ Yrs
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Experience</p>
          </div>
          <div className="px-2">
            <p className="text-lg sm:text-xl font-black text-slate-900">
              {doctor.petsTreatedCount}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Pets Treated</p>
          </div>
          <div className="px-2">
            <p className="text-lg sm:text-xl font-black text-emerald-600 flex items-center justify-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
              <span>{doctor.rating}</span>
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Parent Rating</p>
          </div>
        </div>

        {/* BODY DETAILS */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Doctor's Personal Note */}
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80 text-xs text-slate-700 leading-relaxed relative">
            <p className="italic text-slate-600">&ldquo;{doctor.quote}&rdquo;</p>
            <p className="text-[11px] font-bold text-teal-800 mt-2 text-right">
              — {doctor.name}, {doctor.degree}
            </p>
          </div>

          {/* Key Specializations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-teal-600" />
              <span>Clinical Specializations</span>
            </h4>
            <div className="space-y-1.5">
              {doctor.specializations.map((spec) => (
                <div key={spec} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp Assurance */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              <span>Direct WhatsApp Doctor Connection</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-800">
              You chat or call directly with {doctor.name}. No junior agents, no call centers, and no AI chatbots.
            </p>
          </div>

          {/* Consultation Fee Pill */}
          <div className="flex items-center justify-between rounded-xl bg-teal-50 px-3.5 py-2 border border-teal-100">
            <span className="text-xs text-teal-900 font-semibold">Consultation Fee</span>
            <span className="text-sm font-black text-emerald-700">
              ₹100 <span className="text-[10px] font-normal text-slate-500">(Pay via UPI after intake)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
