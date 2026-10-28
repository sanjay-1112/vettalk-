"use client";

import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { getWhatsAppUrl, WhatsAppMessagePayload } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  payload: WhatsAppMessagePayload;
  className?: string;
  size?: "md" | "lg";
}

export function WhatsAppButton({
  payload,
  className = "",
  size = "lg",
}: WhatsAppButtonProps) {
  const whatsappUrl = getWhatsAppUrl(payload);

  const sizeClasses =
    size === "lg"
      ? "py-4 px-6 text-base sm:text-lg font-bold gap-3"
      : "py-2.5 px-4 text-sm font-semibold gap-2";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.99] transition-all ${sizeClasses} ${className}`}
    >
      <MessageCircle className="h-6 w-6 shrink-0 fill-white/20" />
      <span>Continue on WhatsApp</span>
      <ArrowRight className="h-5 w-5 shrink-0" />
    </a>
  );
}
