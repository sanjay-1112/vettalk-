"use client";

import React from "react";
import { UtensilsCrossed, AlertCircle, Sparkle, HeartPulse, Apple, Syringe, Baby, ArrowUpRight } from "lucide-react";

interface PetConcernCardsProps {
  onSelectConcern?: (concern: string) => void;
}

export function PetConcernCards({ onSelectConcern }: PetConcernCardsProps) {
  const concerns = [
    {
      title: "Dog not eating",
      desc: "Loss of appetite or picky eating",
      icon: UtensilsCrossed,
      color: "text-amber-600 bg-amber-50 border-amber-200/60",
    },
    {
      title: "Vomiting / loose motions",
      desc: "Stomach upset & digestive distress",
      icon: AlertCircle,
      color: "text-rose-600 bg-rose-50 border-rose-200/60",
    },
    {
      title: "Skin problems",
      desc: "Itching, rashes, ear infections, fur loss",
      icon: Sparkle,
      color: "text-purple-600 bg-purple-50 border-purple-200/60",
    },
    {
      title: "General pet health",
      desc: "Lethargy, mild limping, wellness check",
      icon: HeartPulse,
      color: "text-teal-600 bg-teal-50 border-teal-200/60",
    },
    {
      title: "Diet questions",
      desc: "Nutrition, safe foods, weight care",
      icon: Apple,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    },
    {
      title: "Vaccination questions",
      desc: "Puppy/kitten shots, booster schedules",
      icon: Syringe,
      color: "text-blue-600 bg-blue-50 border-blue-200/60",
    },
    {
      title: "Puppy/kitten guidance",
      desc: "New pet onboarding, teething, growth",
      icon: Baby,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200/60",
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 bg-slate-50/50">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Common Symptoms We Address
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            What is your pet experiencing?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select a category or describe your pet’s symptom below
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {concerns.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href="#consult-form"
                onClick={() => onSelectConcern?.(item.title)}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-teal-500 hover:shadow-sm transition-all text-left"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 transition-colors ml-1 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
