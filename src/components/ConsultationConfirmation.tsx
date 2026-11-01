"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Copy,
  Check,
  QrCode,
  Smartphone,
  ExternalLink,
} from "lucide-react";
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
  const [copied, setCopied] = useState(false);
  const upiId = "sanjay1112198@okicici";
  const upiPayee = "Sanjay Soni";
  const consultationAmount = "200";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Deep link for mobile UPI apps
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    upiPayee
  )}&am=${consultationAmount}&cu=INR&tn=${encodeURIComponent(
    `VetTalk Ref ${data.referenceId}`
  )}`;

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-6 sm:py-8">
      <div className="rounded-2xl border border-teal-200 bg-white p-5 sm:p-8 text-center shadow-lg shadow-teal-500/5">
        {/* Official VetTalk Brand Logo Badge */}
        <div className="mx-auto relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full overflow-hidden ring-4 ring-teal-500/20 shadow-md bg-white mb-2">
          <Image
            src="/images/vettalk-logo.jpg"
            alt="VetTalk (24*7) Official Logo"
            width={120}
            height={120}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
          Request Logged Successfully
        </span>

        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Case File #{data.referenceId}
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Your details are ready. Tap below to connect directly with Dr. R. Soni on WhatsApp.
        </p>

        {/* Primary Action: Open WhatsApp */}
        <div className="mt-5">
          <WhatsAppButton payload={data} size="lg" />
          <p className="mt-2 text-xs text-slate-500">
            WhatsApp will open with your pet details and consultation reference.
          </p>
        </div>

        {/* Case Summary Card */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left space-y-2 text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Consultation Reference:</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
              {data.referenceId}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Pet:</span>
            <span className="font-bold text-slate-800">
              {data.petName} ({data.petType})
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Owner:</span>
            <span className="font-semibold text-slate-800">
              {data.ownerName}
              {data.ownerPhone ? (
                <span className="text-xs font-normal text-slate-500 ml-1">
                  (+91 {data.ownerPhone})
                </span>
              ) : null}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs text-slate-500 font-medium">Preferred Time:</span>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              {data.preferredSlot || "Right Now (Within 5-10 mins)"}
            </span>
          </div>

          {data.photoUrl && (
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="text-xs text-slate-500 font-medium">Uploaded Photo:</span>
              <a
                href={data.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <span>View Pet Photo</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 font-medium">Consultation Fee:</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-600">
              Flat ₹200 <span className="text-[11px] font-normal text-slate-500">(Payable via UPI)</span>
            </span>
          </div>
        </div>

        {/* UPI QR CODE & PAYMENT SECTION */}
        <div className="mt-6 rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 p-4 sm:p-5 text-left shadow-sm">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <QrCode className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  UPI Payment Details &middot; Flat ₹200
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pay now or right after your doctor consultation
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              All UPI Apps
            </span>
          </div>

          {/* QR Code and Info Flex */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            {/* Real QR Code Image */}
            <div className="shrink-0 bg-white p-2 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-lg">
                <Image
                  src="/images/upi-qr.jpg"
                  alt="UPI QR Code - Flat ₹200"
                  width={200}
                  height={200}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">
                Scan with GPay / PhonePe / Paytm
              </p>
            </div>

            {/* UPI ID Details & Quick Actions */}
            <div className="flex-1 w-full space-y-2.5">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Official UPI ID
                </span>
                <div className="mt-1 flex items-center justify-between rounded-lg bg-white border border-slate-200 px-3 py-2 font-mono text-xs sm:text-sm font-bold text-slate-800 shadow-2xs">
                  <span className="truncate">{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="ml-2 inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700 hover:bg-teal-100 transition-colors shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-white p-2 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">Payee Name</span>
                  <span className="font-semibold text-slate-800">{upiPayee}</span>
                </div>
                <div className="rounded-lg bg-white p-2 border border-slate-200/80">
                  <span className="text-[10px] text-slate-400 block">Amount</span>
                  <span className="font-extrabold text-emerald-600">Flat ₹200</span>
                </div>
              </div>

              {/* Direct UPI App link for mobile */}
              <a
                href={upiDeepLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs"
              >
                <Smartphone className="h-3.5 w-3.5 text-teal-300" />
                <span>Tap to Pay ₹200 via UPI App</span>
              </a>
            </div>
          </div>

          {/* Payment Guidance Note */}
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-teal-50/70 p-2.5 text-[11px] text-teal-900 border border-teal-100">
            <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              <strong>Payment Process:</strong> These UPI payment details are also automatically included in your WhatsApp chat message. You can complete the payment once Dr. R. Soni has answered your queries.
            </span>
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
