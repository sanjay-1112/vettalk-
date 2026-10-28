import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertTriangle, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Online Vet Consultation",
  description: "Terms of service and non-emergency clinical disclaimer for online veterinary consultations.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 mx-auto max-w-2xl w-full px-4 sm:px-6 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <FileText className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Terms & Conditions</h1>
          </div>

          <p className="text-xs text-slate-400 mb-6">Last updated: October 2026</p>

          {/* CRITICAL MEDICAL DISCLAIMER HIGHLIGHT */}
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 mb-6">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-amber-900">
                  Critical Emergency Care Disclaimer
                </h3>
                <p className="text-xs leading-relaxed text-amber-950/90 mt-1 font-medium">
                  This service does NOT replace in-person or emergency veterinary care. If your pet suffers from acute distress, severe breathing difficulty, profuse bleeding, seizures, collapse, suspected poisoning, severe trauma, or life-threatening symptoms, immediately transport your pet to the nearest physical veterinary hospital or emergency clinic.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate prose-sm text-xs leading-relaxed space-y-4 text-slate-700">
            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                1. Nature of the Service
              </h2>
              <p>
                Our platform provides online triage, dietary advice, second opinions, and wellness consultations by connecting pet guardians with registered veterinary professionals via WhatsApp. Tele-triage is based solely on the information, descriptions, and photographs you provide.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                2. Scope of Online Consultation
              </h2>
              <p>
                Online guidance cannot substitute for hands-on physical palpation, comprehensive auscultation, laboratory diagnostics, diagnostic imaging, or urgent surgical intervention. Where clinically necessary, the veterinarian may instruct you to seek immediate physical veterinary attention.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                3. Consultation Fees & Payments
              </h2>
              <p>
                Consultation fees start at ₹100. Payments are settled manually via standard UPI after case review and intake. Fees cover the professional time and medical guidance of the attending veterinarian.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                4. User Responsibilities
              </h2>
              <p>
                You agree to provide truthful, accurate, and complete information regarding your pet&apos;s symptoms, medical history, and current medications. Never delay physical emergency care based on the expectation of an online reply.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
