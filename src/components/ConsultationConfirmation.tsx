"use client";

import React from "react";
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Heart } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { WhatsAppMessagePayload } from "@/lib/whatsapp";

interface ConsultationConfirmationProps {
  data: WhatsAppMessagePayload;
  onReset: () => void;
}

export function ConsultationConfirmation({
  data,
  onReset,
}: ConsultationConfirmationProps) {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-8">
      <div className="rounded-2xl border border-teal-200 bg-white p-6 sm:p-8 text-center shadow-lg shadow-teal-500/5">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-8 ring-teal-50/50">
          <CheckCircle2 className="h-10 w-10 text-teal-600" />
        </div>

        <span className="mt-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          Request Logged Successfully
        </span>

        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Consultation Request Received
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          We have generated your case file. Click below to continue directly to WhatsApp and begin your consultation with the on-duty veterinarian.
        </p>

        {/* Case Summary Card */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Consultation Reference:</span>
            <span className="font-mono text-sm font-bold text-teal-800 bg-white px-2.5 py-0.5 rounded border border-teal-200">
              {data.referenceId}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Pet Name:</span>
            <span className="text-sm font-bold text-slate-800">
              {data.petName} ({data.petType})
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Owner:</span>
            <span className="text-sm font-semibold text-slate-800">
              {data.ownerName}
              {data.ownerPhone ? (
                <span className="text-xs font-normal text-slate-500 ml-1">
                  (+91 {data.ownerPhone})
                </span>
              ) : null}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 font-medium">Consultation Fee:</span>
            <span className="text-base font-extrabold text-emerald-600">
              ₹100 <span className="text-xs font-normal text-slate-500">(Payable via UPI)</span>
            </span>
          </div>
        </div>

        {/* WhatsApp Action Button */}
        <div className="mt-6">
          <WhatsAppButton payload={data} size="lg" />
          <p className="mt-2 text-xs text-slate-500">
            WhatsApp will open with your pre-filled consultation details.
          </p>
        </div>

        {/* How payment works banner */}
        <div className="mt-6 rounded-xl bg-teal-50/60 p-3.5 border border-teal-100 text-left">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-900 leading-relaxed">
              <span className="font-bold">Next Steps on WhatsApp:</span> The veterinarian will review {data.petName}&apos;s condition, recommend prompt care, and provide UPI details to settle the ₹100 fee.
            </div>
          </div>
        </div>

        {/* Back / New Consultation */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Submit another consultation request</span>
          </button>
        </div>
      </div>
    </div>
  );
}
