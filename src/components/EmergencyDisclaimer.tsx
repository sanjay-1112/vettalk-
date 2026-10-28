"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

export function EmergencyDisclaimer() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 my-6">
      <div className="rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-left shadow-xs">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-200/80 text-amber-800">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-amber-900">
              Important Medical Safety Notice
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-amber-950/90 font-medium">
              This service is intended for non-emergency veterinary guidance. If your pet is experiencing severe breathing difficulty, heavy bleeding, unconsciousness, seizures, suspected poisoning, major trauma, or another potentially life-threatening condition, contact or visit an emergency veterinary facility immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
