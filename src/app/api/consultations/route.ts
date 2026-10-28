import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  isSupabaseServerConfigured,
  devFallbackStore,
} from "@/lib/supabase/server";
import { generateReferenceId } from "@/lib/reference";
import { isAuthenticatedAdmin } from "@/lib/auth";
import {
  PetType,
  PetGender,
  ProblemDuration,
  ConsultationRequest,
} from "@/types/consultation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const owner_name = (formData.get("owner_name") as string)?.trim();
    const mobile_number = (formData.get("mobile_number") as string)?.trim();
    const city = (formData.get("city") as string)?.trim() || null;
    const pet_name = (formData.get("pet_name") as string)?.trim();
    const pet_type = (formData.get("pet_type") as PetType) || "Dog";
    const breed = (formData.get("breed") as string)?.trim() || null;
    const pet_age = (formData.get("pet_age") as string)?.trim() || null;
    const pet_gender = (formData.get("pet_gender") as PetGender) || "Unknown";
    const main_concern = (formData.get("main_concern") as string)?.trim();
    const problem_duration =
      (formData.get("problem_duration") as ProblemDuration) || "Today";
    const disclaimer_accepted = formData.get("disclaimer_accepted") === "true";

    const utm_source = (formData.get("utm_source") as string)?.trim() || null;
    const utm_medium = (formData.get("utm_medium") as string)?.trim() || null;
    const utm_campaign = (formData.get("utm_campaign") as string)?.trim() || null;
    const utm_content = (formData.get("utm_content") as string)?.trim() || null;

    // Validation
    if (!owner_name) {
      return NextResponse.json(
        { success: false, error: "Owner name is required" },
        { status: 400 }
      );
    }

    const cleanPhone = mobile_number.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Valid 10-digit mobile number is required" },
        { status: 400 }
      );
    }

    if (!pet_name) {
      return NextResponse.json(
        { success: false, error: "Pet name is required" },
        { status: 400 }
      );
    }

    if (!main_concern || main_concern.length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid description of the pet's condition",
        },
        { status: 400 }
      );
    }

    if (!disclaimer_accepted) {
      return NextResponse.json(
        {
          success: false,
          error: "The medical disclaimer must be acknowledged",
        },
        { status: 400 }
      );
    }

    // Photo file handling
    let photo_url: string | null = null;
    const file = formData.get("file") as File | null;

    if (file && file.size > 0) {
      // Validate file type
      const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowedMimes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: "Only JPG, PNG or WebP images are allowed" },
          { status: 400 }
        );
      }

      // Validate size <= 5MB
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "Image file must be under 5MB" },
          { status: 400 }
        );
      }

      const client = getSupabaseServerClient();
      if (client) {
        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `consultations/${fileName}`;

        const buffer = Buffer.from(await file.arrayBuffer());
        const { error: uploadError } = await client.storage
          .from("consultation-photos")
          .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicUrlData } = client.storage
            .from("consultation-photos")
            .getPublicUrl(filePath);
          photo_url = publicUrlData.publicUrl;
        } else {
          console.warn("Storage upload error (fallback active):", uploadError.message);
        }
      }
    }

    const reference_id = generateReferenceId();

    const record: ConsultationRequest = {
      id: crypto.randomUUID(),
      reference_id,
      created_at: new Date().toISOString(),
      owner_name,
      mobile_number: cleanPhone,
      city,
      pet_name,
      pet_type,
      breed,
      pet_age,
      pet_gender,
      main_concern,
      problem_duration,
      photo_url,
      consultation_status: "new",
      payment_status: "pending",
      consultation_amount: 100,
      admin_notes: null,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    };

    const supabase = getSupabaseServerClient();

    if (supabase && isSupabaseServerConfigured) {
      const { data, error } = await supabase
        .from("consultation_requests")
        .insert([
          {
            reference_id: record.reference_id,
            owner_name: record.owner_name,
            mobile_number: record.mobile_number,
            city: record.city,
            pet_name: record.pet_name,
            pet_type: record.pet_type,
            breed: record.breed,
            pet_age: record.pet_age,
            pet_gender: record.pet_gender,
            main_concern: record.main_concern,
            problem_duration: record.problem_duration,
            photo_url: record.photo_url,
            consultation_status: record.consultation_status,
            payment_status: record.payment_status,
            consultation_amount: record.consultation_amount,
            admin_notes: record.admin_notes,
            utm_source: record.utm_source,
            utm_medium: record.utm_medium,
            utm_campaign: record.utm_campaign,
            utm_content: record.utm_content,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        // Fallback to in-memory store in dev if DB table isn't migrated yet
        devFallbackStore.insert(record);
      } else if (data) {
        record.id = data.id;
      }
    } else {
      // Local development fallback
      devFallbackStore.insert(record);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: record.id,
        reference_id: record.reference_id,
      },
    });
  } catch (error: unknown) {
    console.error("POST /api/consultations error:", error);
    const msg =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Protect admin access
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();

    if (supabase && isSupabaseServerConfigured) {
      const { data, error } = await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase select error:", error);
        return NextResponse.json({
          success: true,
          data: devFallbackStore.getAll(),
        });
      }

      return NextResponse.json({
        success: true,
        data: data || [],
      });
    }

    return NextResponse.json({
      success: true,
      data: devFallbackStore.getAll(),
    });
  } catch (error: unknown) {
    console.error("GET /api/consultations error:", error);
    const msg =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
