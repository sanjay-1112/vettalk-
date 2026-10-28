"use client";

import React, { useState } from "react";
import {
  ConsultationRequest,
  ConsultationStatus,
  PaymentStatus,
} from "@/types/consultation";
import { StatusBadge } from "./StatusBadge";
import { PaymentBadge } from "./PaymentBadge";
import {
  ExternalLink,
  MessageCircle,
  Clock,
  Phone,
  User,
  PawPrint,
  FileText,
  Calendar,
  X,
  Save,
  Loader2,
  Tag,
  CheckCircle,
} from "lucide-react";

interface AdminConsultationTableProps {
  consultations: ConsultationRequest[];
  onUpdate: (
    id: string,
    updates: {
      consultation_status?: ConsultationStatus;
      payment_status?: PaymentStatus;
      admin_notes?: string;
      consultation_amount?: number;
    }
  ) => Promise<boolean>;
}

export function AdminConsultationTable({
  consultations,
  onUpdate,
}: AdminConsultationTableProps) {
  const [selectedItem, setSelectedItem] = useState<ConsultationRequest | null>(null);
  const [statusVal, setStatusVal] = useState<ConsultationStatus>("new");
  const [paymentVal, setPaymentVal] = useState<PaymentStatus>("pending");
  const [notesVal, setNotesVal] = useState<string>("");
  const [amountVal, setAmountVal] = useState<number>(100);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const openDetails = (item: ConsultationRequest) => {
    setSelectedItem(item);
    setStatusVal(item.consultation_status);
    setPaymentVal(item.payment_status);
    setNotesVal(item.admin_notes || "");
    setAmountVal(item.consultation_amount || 100);
    setSaveSuccess(false);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    setIsSaving(true);
    setSaveSuccess(false);

    const success = await onUpdate(selectedItem.id, {
      consultation_status: statusVal,
      payment_status: paymentVal,
      admin_notes: notesVal,
      consultation_amount: amountVal,
    });

    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      // update local reference
      setSelectedItem({
        ...selectedItem,
        consultation_status: statusVal,
        payment_status: paymentVal,
        admin_notes: notesVal,
        consultation_amount: amountVal,
      });
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div>
      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 font-bold text-slate-600 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Ref & Time</th>
              <th className="py-3.5 px-4">Owner & Phone</th>
              <th className="py-3.5 px-4">Pet Details</th>
              <th className="py-3.5 px-4">Main Concern</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Payment</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {consultations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  No consultation requests found for this filter.
                </td>
              </tr>
            ) : (
              consultations.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => openDetails(item)}
                >
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {item.reference_id}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(item.created_at)}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{item.owner_name}</p>
                    <a
                      href={`https://wa.me/91${item.mobile_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="h-3 w-3" />
                      {item.mobile_number}
                    </a>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">
                      {item.pet_name}
                      <span className="ml-1 text-[11px] font-normal text-slate-500">
                        ({item.pet_type})
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {[item.breed, item.pet_age, item.pet_gender]
                        .filter(Boolean)
                        .join(" &middot; ")}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="truncate text-slate-800" title={item.main_concern}>
                      {item.main_concern}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Duration: {item.problem_duration}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={item.consultation_status} />
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <PaymentBadge
                      status={item.payment_status}
                      amount={item.consultation_amount}
                    />
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`https://wa.me/91${item.mobile_number}?text=Hello%20${encodeURIComponent(
                          item.owner_name
                        )}%2C%20this%20is%20the%20veterinarian%20regarding%20${encodeURIComponent(
                          item.pet_name
                        )}%20(Ref%3A%20${encodeURIComponent(item.reference_id)}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 flex items-center gap-1 border border-emerald-200"
                        title="Open WhatsApp with Owner"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Chat</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => openDetails(item)}
                        className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="lg:hidden space-y-3">
        {consultations.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
            No consultation requests found for this filter.
          </div>
        ) : (
          consultations.map((item) => (
            <div
              key={item.id}
              onClick={() => openDetails(item)}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs active:bg-slate-50 transition-colors cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {item.reference_id}
                </span>
                <span className="text-[11px] text-slate-400">
                  {formatTime(item.created_at)}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.pet_name}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      ({item.pet_type})
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Owner: {item.owner_name} &middot; {item.city || "India"}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={item.consultation_status} />
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 leading-relaxed border border-slate-100">
                <p className="font-medium line-clamp-2">{item.main_concern}</p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Duration: {item.problem_duration}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <PaymentBadge
                  status={item.payment_status}
                  amount={item.consultation_amount}
                />

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`https://wa.me/91${item.mobile_number}?text=Hello%20${encodeURIComponent(
                      item.owner_name
                    )}%2C%20this%20is%20the%20veterinarian%20regarding%20${encodeURIComponent(
                      item.pet_name
                    )}%20(Ref%3A%20${encodeURIComponent(item.reference_id)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 flex items-center gap-1 shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openDetails(item)}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAILED MODAL / DRAWER */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Consultation Details
                  </h3>
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {selectedItem.reference_id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged {formatTime(selectedItem.created_at)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDetails}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Pet & Owner Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500 mb-2">
                    <User className="h-3.5 w-3.5 text-teal-600" />
                    <span>Owner Information</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedItem.owner_name}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Phone: <span className="font-semibold">+91 {selectedItem.mobile_number}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    City: {selectedItem.city || "Not provided"}
                  </p>
                  <a
                    href={`https://wa.me/91${selectedItem.mobile_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-xs"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500 mb-2">
                    <PawPrint className="h-3.5 w-3.5 text-teal-600" />
                    <span>Pet Information</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedItem.pet_name}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      ({selectedItem.pet_type})
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Breed: {selectedItem.breed || "Not specified"}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Age: {selectedItem.pet_age || "Not specified"} &middot; Gender: {selectedItem.pet_gender}
                  </p>
                </div>
              </div>

              {/* Main Concern & Duration */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                    <FileText className="h-3.5 w-3.5 text-teal-600" />
                    <span>Main Concern</span>
                  </div>
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                    Started: {selectedItem.problem_duration}
                  </span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedItem.main_concern}
                </p>

                {/* Uploaded Photo */}
                {selectedItem.photo_url && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Attached Pet Photo:
                    </p>
                    <a
                      href={selectedItem.photo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block max-w-sm rounded-xl overflow-hidden border border-slate-200 hover:opacity-90 transition-opacity"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedItem.photo_url}
                        alt="Uploaded pet photo"
                        className="w-full max-h-60 object-cover"
                      />
                    </a>
                  </div>
                )}
              </div>

              {/* Status & Payment Updates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Consultation Status
                  </label>
                  <select
                    value={statusVal}
                    onChange={(e) => setStatusVal(e.target.value as ConsultationStatus)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs focus:border-teal-600 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="waiting">Waiting</option>
                    <option value="in_consultation">In Consultation</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentVal}
                    onChange={(e) => setPaymentVal(e.target.value as PaymentStatus)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs focus:border-teal-600 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="waived">Waived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={amountVal}
                    onChange={(e) => setAmountVal(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Admin Clinical Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doctor / Admin Notes & Prescription Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Record symptoms discussed on WhatsApp, tentative diagnosis, advice, or payment confirmation details..."
                  value={notesVal}
                  onChange={(e) => setNotesVal(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-800 shadow-2xs focus:border-teal-600 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Instagram UTM Attribution (Phase H) */}
              {(selectedItem.utm_source ||
                selectedItem.utm_medium ||
                selectedItem.utm_campaign) && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-600 mb-1.5">
                    <Tag className="h-3.5 w-3.5 text-teal-600" />
                    <span>Instagram Marketing Attribution</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Source:</span>
                      <span className="font-semibold">{selectedItem.utm_source || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Medium:</span>
                      <span className="font-semibold">{selectedItem.utm_medium || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Campaign:</span>
                      <span className="font-semibold">{selectedItem.utm_campaign || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Content:</span>
                      <span className="font-semibold">{selectedItem.utm_content || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
              {saveSuccess ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle className="h-4 w-4" /> Changes saved successfully!
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  Updates persist immediately to database.
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeDetails}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
