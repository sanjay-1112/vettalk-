"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  ConsultationRequest,
  ConsultationStatus,
  PaymentStatus,
} from "@/types/consultation";
import { AdminConsultationTable } from "@/components/AdminConsultationTable";

type FilterTab =
  | "all"
  | "new"
  | "waiting"
  | "in_consultation"
  | "completed"
  | "payment_pending"
  | "paid";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Login Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data state
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [dataError, setDataError] = useState<string | null>(null);

  // Check initial session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/session");
        const json = await res.json();
        setIsAuthenticated(json.authenticated);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingAuth(false);
      }
    }
    checkAuth();
  }, []);

  const fetchConsultations = useCallback(async () => {
    setIsLoadingData(true);
    setDataError(null);
    try {
      const res = await fetch("/api/consultations");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setConsultations(json.data);
      } else {
        setDataError(json.error || "Failed to load consultation records");
      }
    } catch {
      setDataError("Unable to connect to server. Please try refreshing.");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchConsultations();
    }
  }, [isAuthenticated, fetchConsultations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setLoginError(json.error || "Invalid username or password");
      } else {
        setIsAuthenticated(true);
      }
    } catch {
      setLoginError("Login failed. Check server connectivity.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
    }
  };

  const handleUpdate = async (
    id: string,
    updates: {
      consultation_status?: ConsultationStatus;
      payment_status?: PaymentStatus;
      admin_notes?: string;
      consultation_amount?: number;
    }
  ): Promise<boolean> => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        // Update local state
        setConsultations((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, ...json.data } : item
          )
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Filtered consultations
  const filteredConsultations = consultations.filter((item) => {
    // Search match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.reference_id.toLowerCase().includes(q) ||
      item.owner_name.toLowerCase().includes(q) ||
      item.pet_name.toLowerCase().includes(q) ||
      item.mobile_number.includes(q) ||
      (item.city && item.city.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    // Filter tab match
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return item.consultation_status === "new";
    if (activeFilter === "waiting") return item.consultation_status === "waiting";
    if (activeFilter === "in_consultation")
      return item.consultation_status === "in_consultation";
    if (activeFilter === "completed")
      return item.consultation_status === "completed";
    if (activeFilter === "payment_pending")
      return item.payment_status === "pending";
    if (activeFilter === "paid") return item.payment_status === "paid";

    return true;
  });

  // Calculate quick stats
  const totalCount = consultations.length;
  const newCount = consultations.filter((c) => c.consultation_status === "new").length;
  const inProgressCount = consultations.filter(
    (c) => c.consultation_status === "in_consultation" || c.consultation_status === "waiting"
  ).length;
  const pendingPaymentCount = consultations.filter((c) => c.payment_status === "pending").length;

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // 1. UNPROTECTED ACCESS BLOCKED: DISPLAY LOGIN CARD
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-slate-50 py-12 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-900">VetTalk (24*7)</span>
            </Link>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Doctor &amp; Staff Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Restricted access &middot; Authorized clinic staff only
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/50">
            {loginError && (
              <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 px-4 text-sm font-bold text-white shadow-sm hover:bg-teal-700 disabled:opacity-70 transition-colors"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Access Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-teal-700 inline-flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Public Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED: DISPLAY ADMIN DASHBOARD
  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-slate-900 hidden sm:inline">
                VetTalk (24*7)
              </span>
            </Link>
            <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 border border-teal-200">
              Clinical Desk &middot; Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchConsultations}
              disabled={isLoadingData}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              title="Refresh Records"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-slate-500 ${
                  isLoadingData ? "animate-spin" : ""
                }`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200/60"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-6">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">Total Requests</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalCount}</p>
          </div>

          <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 shadow-2xs">
            <p className="text-xs font-semibold text-teal-700">New / Unattended</p>
            <p className="text-2xl font-black text-teal-900 mt-1">{newCount}</p>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 shadow-2xs">
            <p className="text-xs font-semibold text-purple-700">In Consultation</p>
            <p className="text-2xl font-black text-purple-900 mt-1">{inProgressCount}</p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
            <p className="text-xs font-semibold text-amber-700">Payment Pending</p>
            <p className="text-2xl font-black text-amber-900 mt-1">
              {pendingPaymentCount}
            </p>
          </div>
        </div>

        {/* Search & Filter Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 mb-5 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search reference, owner, pet, phone, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs sm:text-sm outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900">{filteredConsultations.length}</strong> of {totalCount} requests
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filter:
            </span>
            {(
              [
                { id: "all", label: "All" },
                { id: "new", label: "New" },
                { id: "waiting", label: "Waiting" },
                { id: "in_consultation", label: "In Consultation" },
                { id: "completed", label: "Completed" },
                { id: "payment_pending", label: "Payment Pending" },
                { id: "paid", label: "Paid" },
              ] as { id: FilterTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? "bg-teal-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {dataError && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
            {dataError}
          </div>
        )}

        {/* Table & Drawer */}
        <AdminConsultationTable
          consultations={filteredConsultations}
          onUpdate={handleUpdate}
        />
      </main>
    </div>
  );
}
