"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  MessageCircle,
  FileCheck2,
  Stethoscope,
} from "lucide-react";

export interface DoctorInfo {
  name: string;
  title: string;
  experienceYears: number;
  councilName: string;
  licenseNo: string;
  petsTreatedCount: string;
  rating: string;
  photoUrl: string;
  specializations: string[];
  summary: string;
}

export const DEFAULT_DOCTOR: DoctorInfo = {
  name: "Dr. R. Soni",
  title: "Sr. Veterinarian",
  experienceYears: 15,
  councilName: "Telangana State Veterinary Council (TSVC)",
  licenseNo: "TSVC/02330/2024",
  petsTreatedCount: "12,000+",
  rating: "4.9 / 5",
  photoUrl: "/images/dr-soni.jpg",
  specializations: [
    "Canine & Feline Internal Medicine",
    "Vomiting, Fever & Diarrhea Triage",
    "Skin, Coat & Ear Infections",
    "Puppy & Kitten Pediatric Care",
  ],
  summary:
    "15+ years of dedicated clinical veterinary practice. Personally reviewing your pet's symptoms on WhatsApp to provide honest care, instant triage, and treatment guidance.",
};

interface DoctorProfileCardProps {
  doctor?: DoctorInfo;
}

export function DoctorProfileCard({ doctor = DEFAULT_DOCTOR }: DoctorProfileCardProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border-2 border-teal-200/80 bg-white shadow-lg shadow-teal-900/5 transition-all">
        {/* DOCTOR HERO BANNER WITH PROFESSIONAL BACKGROUND */}
        <div className="relative bg-gradient-to-br from-teal-800 via-teal-700 to-slate-900 p-4 sm:p-5 text-white">
          {/* Subtle decorative background pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Live Status Pill */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-100 backdrop-blur-xs border border-white/20">
              <Stethoscope className="h-3 w-3 text-teal-300" />
              <span>On-Duty Veterinarian</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/40 backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available 24*7</span>
            </span>
          </div>

          {/* Doctor Photo & Identity Row */}
          <div className="flex items-center gap-3.5 sm:gap-4 relative z-10">
            {/* Real Doctor Photo with Ring & Verified Badge */}
            <div className="relative shrink-0">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-2 border-white/80 shadow-md bg-teal-900">
                <Image
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  width={160}
                  height={160}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-teal-800 shadow-sm"
                title="Verified Licensed Veterinarian"
              >
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>

            {/* Doctor Name, Title, and Experience */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {doctor.name}
              </h2>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-teal-100 font-medium">
                <span className="font-bold text-white bg-teal-600/70 px-2 py-0.5 rounded-md border border-white/20">
                  {doctor.title}
                </span>
                <span className="text-teal-200">&middot; {doctor.experienceYears}+ Yrs Exp.</span>
              </div>

              {/* Council License Pill */}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-teal-100/90 font-mono">
                <FileCheck2 className="h-3.5 w-3.5 text-teal-300 shrink-0" />
                <span className="truncate">Reg: <strong className="text-white font-bold">{doctor.licenseNo}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* GOVERNMENT REGISTRATION & VERIFICATION STRIP */}
        <div className="bg-teal-50/90 px-4 py-2 border-b border-teal-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-teal-950 font-medium truncate">
            <ShieldCheck className="h-4 w-4 text-teal-700 shrink-0" />
            <span className="truncate">{doctor.councilName}</span>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300">
            Verified Govt Reg.
          </span>
        </div>

        {/* CLINICAL STATS BAR */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-white py-2.5 text-center">
          <div className="px-1.5">
            <p className="text-base sm:text-lg font-black text-teal-800">
              {doctor.experienceYears}+ Yrs
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Experience</p>
          </div>
          <div className="px-1.5">
            <p className="text-base sm:text-lg font-black text-slate-900">
              {doctor.petsTreatedCount}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Pets Treated</p>
          </div>
          <div className="px-1.5">
            <p className="text-base sm:text-lg font-black text-emerald-600 flex items-center justify-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
              <span>{doctor.rating}</span>
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Rating</p>
          </div>
        </div>

        {/* CONDENSED DOCTOR SUMMARY & ACTION HIGHLIGHTS */}
        <div className="p-4 space-y-3 bg-white">
          {/* Quick Doctor Note */}
          <p className="text-xs text-slate-600 leading-relaxed">
            {doctor.summary}
          </p>

          {/* Key Care Specialties Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {doctor.specializations.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                {spec}
              </span>
            ))}
          </div>

          {/* Direct WhatsApp Assurance & Flat ₹200 Fee Strip */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-950">
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                <span>Direct WhatsApp Consultation</span>
              </div>
              <span className="font-mono text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 shadow-2xs">
                Flat ₹200 Only
              </span>
            </div>
            <p className="text-[11px] leading-snug text-emerald-800">
              You talk directly with {doctor.name}. No junior agents or AI bots. Pay Flat ₹200 via UPI after intake.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
