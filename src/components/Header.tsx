"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-teal-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-500/20">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              VetTalk <span className="text-teal-600 font-extrabold">(24*7)</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 24*7
              </span>
            </span>
            <p className="text-[11px] font-medium text-slate-500 leading-tight">
              Verified Online Veterinary Telehealth
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
            <span>Licensed Indian Veterinarians</span>
          </div>
          <a
            href="#consult-form"
            className="rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
          >
            Consult Vet
          </a>
        </div>
      </div>
    </header>
  );
}
