import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Online Vet Consultation",
  description: "Information about how pet and owner details are used to facilitate veterinary consultation.",
};

export default function PrivacyPage() {
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
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
          </div>

          <p className="text-xs text-slate-400 mb-6">Last updated: October 2026</p>

          <div className="prose prose-slate prose-sm text-xs leading-relaxed space-y-4 text-slate-700">
            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                1. Information We Collect
              </h2>
              <p>
                When you initiate an online veterinary consultation, we collect basic intake details including:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                <li>Owner details: name, mobile phone number, and optional city.</li>
                <li>Pet details: pet name, species/type (Dog, Cat, etc.), breed, age, and gender.</li>
                <li>Clinical information: your described pet concerns, symptom duration, and any voluntarily uploaded photos of your pet.</li>
                <li>Marketing attribution: referral parameters (such as campaign IDs) if you discovered us via an Instagram advertisement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                2. How We Use Your Information
              </h2>
              <p>
                The information you submit is used exclusively to facilitate your veterinary consultation. Specifically:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                <li>To generate your case reference file so the consulting veterinarian can review your pet&apos;s symptoms.</li>
                <li>To establish communication with you over WhatsApp.</li>
                <li>To maintain clinical intake records for ongoing follow-up consultations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                3. Communication via WhatsApp
              </h2>
              <p>
                By proceeding to consultation on WhatsApp, communication occurs within WhatsApp according to WhatsApp&apos;s standard terms and privacy policies. We do not sell or lease your personal or pet information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                4. Data Security & Retention
              </h2>
              <p>
                We maintain appropriate administrative and technical measures to protect your intake information. Administrative access to consultation records is restricted to authorized personnel.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-900 mb-1">
                5. Contact Us
              </h2>
              <p>
                If you have questions about your intake data or wish to have your consultation information updated or removed, please contact our support team directly via WhatsApp.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
