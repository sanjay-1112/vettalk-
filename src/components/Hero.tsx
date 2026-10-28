"use client";

import React from "react";
import { MessageCircle, Shield, Clock, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/80 via-white to-slate-50 pt-6 pb-10 px-4 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        {/* Instagram/Mobile Friendly Value Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3.5 py-1 text-xs font-semibold text-teal-900 border border-teal-200/60 shadow-sm mb-4">
          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
          <span>Quick 2-minute intake &middot; Direct WhatsApp handoff</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Talk to a Vet <br className="sm:hidden" />
          <span className="text-teal-600">from Home</span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          Get veterinary guidance for your pet through WhatsApp.
        </p>

        {/* Price Highlight Banner */}
        <div className="mt-4 inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 border border-teal-200/80 shadow-sm shadow-teal-500/5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">
            Affordable Care:
          </span>
          <span className="text-lg sm:text-xl font-black text-emerald-600 flex items-center gap-1">
            Consultation starting at ₹100
          </span>
        </div>

        {/* Primary CTA - Visible without scrolling on mobile */}
        <div className="mt-6">
          <a
            href="#consult-form"
            onClick={handleClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-600 px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-teal-600/30 hover:bg-teal-700 active:scale-[0.99] transition-all"
          >
            <MessageCircle className="h-5 w-5 fill-white/20" />
            <span>Consult a Vet Now</span>
          </a>
          <p className="mt-2 text-[11px] text-slate-500 font-medium">
            No app download &middot; Pay ₹100 manually via UPI after intake
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 text-left">
          <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Veterinary</p>
              <p className="text-[10px] text-slate-500">Consultation</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">WhatsApp</p>
              <p className="text-[10px] text-slate-500">Fast Support</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Simple &</p>
              <p className="text-[10px] text-slate-500">Convenient</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white p-3 border border-slate-200/80 shadow-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">No App</p>
              <p className="text-[10px] text-slate-500">Download Required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
