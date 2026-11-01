"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Share2,
} from "lucide-react";

export default function PromoBannerPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const destinationUrl = "https://vettalk-vg5a.vercel.app/?utm_source=banner&utm_medium=promo&utm_campaign=consult_now";
  const bannerImageUrl = "https://vettalk-vg5a.vercel.app/images/vettalk-hero-banner.jpg";

  const htmlEmbedCode = `<a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);">
  <img src="${bannerImageUrl}" alt="VetTalk (24*7) - Talk to a Licensed Vet from Home for Flat ₹200" style="display:block;width:100%;height:auto;" />
</a>`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header pill */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-900 border border-emerald-200 shadow-2xs mb-2">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Interactive Clickable Promo Banner</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Talk to a Licensed Vet from Home
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Click anywhere on the banner or directly tap the red <strong className="text-rose-600">CONSULT NOW &gt;</strong> button below to book an instant WhatsApp consultation for Flat ₹200.
            </p>
          </div>

          {/* INTERACTIVE BANNER CONTAINER WITH RED BUTTON HOTSPOT */}
          <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-300 bg-white group">
            {/* Banner Image */}
            <div className="relative w-full aspect-[1024/535]">
              <Image
                src="/images/vettalk-hero-banner.jpg"
                alt="VetTalk 24*7 Banner - Consult Now Flat ₹200"
                fill
                priority
                className="object-cover"
              />

              {/* ENTIRE BANNER CLICKABLE BACKDROP */}
              <Link
                href="/#consult-form"
                className="absolute inset-0 z-10"
                title="Click to consult a doctor on VetTalk"
              >
                <span className="sr-only">Consult Vet Now</span>
              </Link>

              {/* SPECIFIC PULSING HIGHLIGHT OVER RED CONSULT NOW BUTTON */}
              {/* Coordinates: left: 49.5%, top: 67%, width: 48%, height: 18% */}
              <Link
                href="/#consult-form"
                style={{
                  left: "49.5%",
                  top: "67%",
                  width: "48%",
                  height: "18%",
                }}
                className="absolute z-20 rounded-full border-2 border-white/60 hover:border-white shadow-lg shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center overflow-hidden"
                title="Tap here: Consult Vet Now for Flat ₹200"
              >
                {/* Subtle pulse effect */}
                <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30" />
                <span className="sr-only">Click to Consult Now</span>
              </Link>
            </div>
          </div>

          {/* QUICK ACTION BUTTON */}
          <div className="mt-6 text-center">
            <Link
              href="/#consult-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-700 active:scale-[0.99] transition-all"
            >
              <span>Go to Consultation Booking Form</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-2 text-xs text-slate-500">
              ⚡ Doctor connects within 5–10 minutes on WhatsApp &middot; Flat ₹200 Only
            </p>
          </div>

          {/* EMBEDDING & MARKETING INSTRUCTIONS */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="h-5 w-5 text-teal-600" />
              <span>How to Use & Embed This Clickable Banner</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Use these instructions to publish this clickable banner on websites, Instagram, Facebook Ads, or WhatsApp.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Method 1: HTML Embed Code */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    1. HTML Embed Code (For Websites & Blogs)
                  </span>
                  <button
                    onClick={() => copyToClipboard(htmlEmbedCode, "html")}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-white px-2 py-1 rounded border border-teal-200 hover:bg-teal-50"
                  >
                    {copiedCode === "html" ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy HTML
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] text-slate-700 bg-white p-3 rounded border border-slate-200 overflow-x-auto font-mono">
                  {htmlEmbedCode}
                </pre>
              </div>

              {/* Method 2: Meta / Instagram / Facebook Ads */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  2. Meta / Instagram / Facebook Ads
                </span>
                <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                  <li>Upload the banner image as your <strong>Ad Media</strong>.</li>
                  <li>In the <strong>Destination Website URL</strong> field, paste:
                    <div className="mt-1 flex items-center gap-2">
                      <code className="text-[11px] bg-white p-1 rounded border border-slate-200 font-bold text-teal-800 break-all">
                        https://vettalk-vg5a.vercel.app/
                      </code>
                      <button
                        onClick={() => copyToClipboard("https://vettalk-vg5a.vercel.app/", "url")}
                        className="text-[10px] font-bold text-teal-700 underline shrink-0"
                      >
                        {copiedCode === "url" ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </li>
                  <li>Set Call-to-Action to <strong>&quot;Contact Us&quot;</strong> or <strong>&quot;Learn More&quot;</strong>.</li>
                  <li>When viewers tap anywhere on the banner, Instagram/Facebook immediately opens your intake page!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
