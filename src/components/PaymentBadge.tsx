"use client";

import React from "react";
import { PaymentStatus } from "@/types/consultation";

interface PaymentBadgeProps {
  status: PaymentStatus;
  amount?: number;
}

export function PaymentBadge({ status, amount }: PaymentBadgeProps) {
  const configs: Record<
    PaymentStatus,
    { label: string; bg: string; text: string; dot: string }
  > = {
    pending: {
      label: "Pending",
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      dot: "bg-amber-500",
    },
    paid: {
      label: "Paid",
      bg: "bg-emerald-50 border-emerald-200",
      text: "text-emerald-800",
      dot: "bg-emerald-500",
    },
    waived: {
      label: "Waived",
      bg: "bg-slate-100 border-slate-200",
      text: "text-slate-700",
      dot: "bg-slate-400",
    },
  };

  const config = configs[status] || configs.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${config.bg} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>
        {config.label}
        {amount !== undefined ? ` (₹${amount})` : ""}
      </span>
    </span>
  );
}
