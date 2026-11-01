"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { DoctorProfileCard } from "@/components/DoctorProfileCard";
import { ConsultationForm } from "@/components/ConsultationForm";
import { ConsultationConfirmation } from "@/components/ConsultationConfirmation";
import { EmergencyDisclaimer } from "@/components/EmergencyDisclaimer";
import { HowItWorks } from "@/components/HowItWorks";
import { PetConcernCards } from "@/components/PetConcernCards";
import { Footer } from "@/components/Footer";
import { WhatsAppMessagePayload } from "@/lib/whatsapp";
import { Shield, MessageCircle, Clock, Sparkles } from "lucide-react";

export default function HomePage() {
  const [selectedConcern, setSelectedConcern] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<WhatsAppMessagePayload | null>(
    null
  );

  const handleSelectConcern = (concern: string) => {
    setSelectedConcern(concern);
    const el = document.getElementById("consult-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConsultationSuccess = (data: WhatsAppMessagePayload) => {
    setSubmittedData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setSelectedConcern("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {submittedData ? (
          <ConsultationConfirmation
            data={submittedData}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* HERO TITLE BANNER */}
            <section className="bg-gradient-to-b from-teal-50/90 via-teal-50/30 to-slate-50 pt-4 pb-2 px-4 sm:px-6">
              <div className="mx-auto max-w-4xl text-center">
                {/* Value Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/90 px-3.5 py-1 text-xs font-semibold text-teal-900 border border-teal-200/80 shadow-2xs mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  <span>Instant Online Vet Consult &middot; Flat ₹200 Only</span>
                </div>

                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl leading-tight">
                  Talk to a Vet <span className="text-teal-600">from Home on WhatsApp</span>
                </h1>

                <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal max-w-xl mx-auto">
                  Direct guidance for dogs & cats from licensed Indian veterinarians. Fast 1-minute intake.
                </p>

                {/* Instant Trust Badges */}
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 border border-slate-200/80 shadow-2xs">
                    <Shield className="h-3 w-3 text-teal-600" /> Licensed Indian Veterinarians
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 border border-slate-200/80 shadow-2xs">
                    <MessageCircle className="h-3 w-3 text-emerald-600" /> WhatsApp Direct
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 border border-slate-200/80 shadow-2xs">
                    <Clock className="h-3 w-3 text-teal-600" /> 1-Min Quick Intake
                  </span>
                </div>

                {/* Clickable Hero Graphic Banner */}
                <div className="mt-5 mx-auto max-w-3xl">
                  <a
                    href="#consult-form"
                    className="group relative block aspect-[1024/535] w-full overflow-hidden rounded-2xl border-2 border-emerald-300 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all cursor-pointer bg-white"
                    title="Click to consult a licensed vet now for Flat ₹200"
                  >
                    <Image
                      src="/images/vettalk-hero-banner.jpg"
                      alt="Talk to a Licensed Vet from Home - Flat ₹200 Only"
                      fill
                      priority
                      className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                    {/* Hotspot over the red Consult Now button */}
                    <div
                      style={{
                        left: "49.5%",
                        top: "67%",
                        width: "48%",
                        height: "18%",
                      }}
                      className="absolute z-10 rounded-full border-2 border-white/70 shadow-lg shadow-rose-600/50 group-hover:border-white transition-all overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30" />
                    </div>
                  </a>
                  <p className="mt-1.5 text-center text-[11px] font-medium text-slate-500">
                    👆 Tap the <strong className="text-rose-600">CONSULT NOW</strong> button above to connect on WhatsApp in 5–10 mins &middot; Flat ₹200
                  </p>
                </div>
              </div>
            </section>

            {/* DUAL COLUMN WORKSPACE: Doctor Profile on Side Wall (Desktop) or Pre-Form (Mobile) */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                {/* LEFT SIDE WALL: Comprehensive Doctor Profile & Credentials */}
                <div className="lg:col-span-5 mb-6 lg:mb-0 lg:sticky lg:top-20">
                  <DoctorProfileCard />
                </div>

                {/* RIGHT COLUMN: The Consultation Intake Form */}
                <div className="lg:col-span-7">
                  <ConsultationForm
                    initialConcern={selectedConcern}
                    onSuccess={handleConsultationSuccess}
                  />
                </div>
              </div>
            </div>

            {/* IMPORTANT MEDICAL DISCLAIMER */}
            <EmergencyDisclaimer />

            {/* HOW IT WORKS */}
            <HowItWorks />

            {/* COMMON SYMPTOM CATEGORIES */}
            <PetConcernCards onSelectConcern={handleSelectConcern} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
