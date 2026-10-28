"use client";

import React from "react";
import { ConsultationStatus } from "@/types/consultation";

interface StatusBadgeProps {
  status: ConsultationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs: Record<
    ConsultationStatus,
    { label: string; bg: string; text: string; dot: string }
  > = {
    new: {
      label: "New Request",
      bg: "bg-teal-50 border-teal-200",
      text: "text-teal-700",
      dot: "bg-teal-500",
    },
    waiting: {
      label: "Waiting",
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    in_consultation: {
      label: "In Consultation",
      bg: "bg-purple-50 border-purple-200",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },
    completed: {
      label: "Completed",
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    cancelled: {
      label: "Cancelled",
      bg: "bg-rose-50 border-rose-200",
      text: "text-rose-700",
      dot: "bg-rose-500",
    },
  };

  const config = configs[status] || configs.new;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${config.bg} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
