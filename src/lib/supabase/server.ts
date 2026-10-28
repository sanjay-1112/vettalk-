import { createClient } from "@supabase/supabase-js";
import { ConsultationRequest } from "@/types/consultation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseServerConfigured = Boolean(
  supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)
);

// Server-side client with highest privileged role available
export const getSupabaseServerClient = () => {
  if (!isSupabaseServerConfigured) return null;
  return createClient(
    supabaseUrl,
    supabaseServiceRoleKey || supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
};

// In-memory fallback repository for local preview and testing before Supabase env is plugged in
class DevFallbackStore {
  private requests: ConsultationRequest[] = [
    {
      id: "demo-uuid-1",
      reference_id: "VET-20261028-A19X",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      owner_name: "Pooja Reddy",
      mobile_number: "9876501234",
      city: "Bangalore",
      pet_name: "Leo",
      pet_type: "Dog",
      breed: "Golden Retriever",
      pet_age: "3 years",
      pet_gender: "Male",
      main_concern: "Not eating dry food since yesterday and vomiting bile this morning.",
      problem_duration: "Yesterday",
      photo_url: null,
      consultation_status: "new",
      payment_status: "pending",
      consultation_amount: 100,
      admin_notes: "Followed up on WhatsApp. Waiting for video clip.",
      utm_source: "instagram",
      utm_medium: "story_ad",
      utm_campaign: "puppy_care_oct",
      utm_content: "video_cta",
    },
    {
      id: "demo-uuid-2",
      reference_id: "VET-20261028-B47Z",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      owner_name: "Amit Patel",
      mobile_number: "9820012345",
      city: "Mumbai",
      pet_name: "Misty",
      pet_type: "Cat",
      breed: "Persian",
      pet_age: "1.5 years",
      pet_gender: "Female",
      main_concern: "Continuous itching around ears, small red scabs visible.",
      problem_duration: "2-3 days ago",
      photo_url: null,
      consultation_status: "in_consultation",
      payment_status: "paid",
      consultation_amount: 100,
      admin_notes: "Prescribed ear drops. Advised e-collar.",
      utm_source: "instagram",
      utm_medium: "feed_carousel",
      utm_campaign: "skin_allergies_monsoon",
      utm_content: "cat_image",
    },
  ];

  getAll(): ConsultationRequest[] {
    return [...this.requests].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  getById(id: string): ConsultationRequest | undefined {
    return this.requests.find((r) => r.id === id || r.reference_id === id);
  }

  insert(record: ConsultationRequest): ConsultationRequest {
    this.requests.unshift(record);
    return record;
  }

  update(
    id: string,
    updates: Partial<ConsultationRequest>
  ): ConsultationRequest | null {
    const idx = this.requests.findIndex(
      (r) => r.id === id || r.reference_id === id
    );
    if (idx === -1) return null;
    this.requests[idx] = { ...this.requests[idx], ...updates };
    return this.requests[idx];
  }
}

// Global singleton across hot reloads in dev
const globalForStore = globalThis as unknown as {
  devFallbackStore?: DevFallbackStore;
};

export const devFallbackStore =
  globalForStore.devFallbackStore || new DevFallbackStore();

if (process.env.NODE_ENV !== "production") {
  globalForStore.devFallbackStore = devFallbackStore;
}
