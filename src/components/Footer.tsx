"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Award } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-teal-500/25 bg-white">
            <Image
              src="/images/vettalk-logo.jpg"
              alt="VetTalk (24*7) Logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-base font-bold text-slate-900">
            VetTalk <span className="text-teal-600 font-extrabold">(24*7)</span>
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Affordable, empathetic online veterinary consultations via WhatsApp. Consultations conducted by licensed, state-registered veterinarians.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 my-6">
          <Link href="/privacy" className="hover:text-teal-700 transition-colors">
            Privacy Policy
          </Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-teal-700 transition-colors">
            Terms & Conditions
          </Link>
          <span>&middot;</span>
          <Link href="/admin" className="hover:text-teal-700 transition-colors">
            Doctor / Admin Portal
          </Link>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-200/60 leading-normal">
          <strong className="text-slate-700">Non-Emergency Telehealth:</strong> This platform connects pet guardians with registered veterinary practitioners for triage, follow-ups, and pet wellness. For acute physical trauma, heavy bleeding, or poisoning, visit an emergency veterinary hospital immediately.
        </div>

        <div className="mt-6 flex items-center justify-center gap-1 text-[11px] text-slate-400">
          <span>&copy; {currentYear} VetTalk (24*7). Made with</span>
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
          <span>for pets everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
