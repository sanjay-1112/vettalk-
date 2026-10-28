import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  isSupabaseServerConfigured,
  devFallbackStore,
} from "@/lib/supabase/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import {
  ConsultationStatus,
  PaymentStatus,
} from "@/types/consultation";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing consultation ID" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { consultation_status, payment_status, admin_notes, consultation_amount } =
      body;

    const updates: Record<string, unknown> = {};

    if (consultation_status) {
      const validStatuses: ConsultationStatus[] = [
        "new",
        "waiting",
        "in_consultation",
        "completed",
        "cancelled",
      ];
      if (!validStatuses.includes(consultation_status)) {
        return NextResponse.json(
          { success: false, error: "Invalid consultation status" },
          { status: 400 }
        );
      }
      updates.consultation_status = consultation_status;
    }

    if (payment_status) {
      const validPayment: PaymentStatus[] = ["pending", "paid", "waived"];
      if (!validPayment.includes(payment_status)) {
        return NextResponse.json(
          { success: false, error: "Invalid payment status" },
          { status: 400 }
        );
      }
      updates.payment_status = payment_status;
    }

    if (admin_notes !== undefined) {
      updates.admin_notes = admin_notes;
    }

    if (consultation_amount !== undefined) {
      const amt = Number(consultation_amount);
      if (isNaN(amt) || amt < 0) {
        return NextResponse.json(
          { success: false, error: "Invalid consultation amount" },
          { status: 400 }
        );
      }
      updates.consultation_amount = amt;
    }

    const supabase = getSupabaseServerClient();

    if (supabase && isSupabaseServerConfigured) {
      const { data, error } = await supabase
        .from("consultation_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase update error:", error);
        // Fallback update
        const updated = devFallbackStore.update(id, updates);
        return NextResponse.json({ success: true, data: updated });
      }

      return NextResponse.json({ success: true, data });
    }

    const updated = devFallbackStore.update(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Consultation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/consultations/[id] error:", error);
    const msg =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
