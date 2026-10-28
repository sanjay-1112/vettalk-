"use client";

import React from "react";
import { FileText, UserCheck, MessageSquare, CreditCard } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Tell us about your pet",
      description: "Fill a quick 1-minute form with basic details and symptoms.",
      badge: "1 Min",
    },
    {
      num: "02",
      icon: UserCheck,
      title: "Connect with a veterinarian",
      description: "Our system prepares your case reference for instant medical review.",
      badge: "Instant",
    },
    {
      num: "03",
      icon: MessageSquare,
      title: "Consult through WhatsApp",
      description: "Chat or voice/video call directly with the vet on your phone.",
      badge: "WhatsApp",
    },
    {
      num: "04",
      icon: CreditCard,
      title: "Pay consultation fee",
      description: "Pay the ₹100 fee conveniently via any UPI app after intake.",
      badge: "₹100 UPI",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            How It Works
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Zero friction, no complicated apps or waiting rooms
          </p>
        </div>

        <div className="relative space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-slate-50 hover:border-teal-200/60"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-sm shadow-sm shadow-teal-600/20">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      Step {idx + 1}: {step.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
