-- ==============================================================================
-- Supabase SQL Schema for VetTalk (24*7) Online Veterinary Consultation Platform
-- Table: consultation_requests
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Consultation Requests Table
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id VARCHAR(32) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Owner Information
    owner_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    city VARCHAR(100),

    -- Pet Information
    pet_name VARCHAR(100) NOT NULL,
    pet_type VARCHAR(20) NOT NULL CHECK (pet_type IN ('Dog', 'Cat', 'Other')),
    breed VARCHAR(100),
    pet_age VARCHAR(50),
    pet_gender VARCHAR(20) NOT NULL DEFAULT 'Unknown' CHECK (pet_gender IN ('Male', 'Female', 'Unknown')),

    -- Clinical Concern & Duration
    main_concern TEXT NOT NULL,
    problem_duration VARCHAR(50) NOT NULL CHECK (
        problem_duration IN ('Today', 'Yesterday', '2-3 days ago', 'More than 3 days ago', 'Not sure')
    ),
    photo_url TEXT,

    -- Lifecycle & Triage Status
    consultation_status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (
        consultation_status IN ('new', 'waiting', 'in_consultation', 'completed', 'cancelled')
    ),

    -- Financial Status (₹100 default)
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
        payment_status IN ('pending', 'paid', 'waived')
    ),
    consultation_amount INTEGER NOT NULL DEFAULT 100,

    -- Clinical / Administration Notes
    admin_notes TEXT,

    -- Instagram Ad Campaign Attribution (UTM)
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(150),
    utm_content VARCHAR(150)
);

-- 3. Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_consultation_status ON public.consultation_requests(consultation_status);
CREATE INDEX IF NOT EXISTS idx_payment_status ON public.consultation_requests(payment_status);
CREATE INDEX IF NOT EXISTS idx_created_at ON public.consultation_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reference_id ON public.consultation_requests(reference_id);

-- 4. Automatic updated_at Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Safe trigger creation
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'trigger_set_updated_at' 
        AND tgrelid = 'public.consultation_requests'::regclass
    ) THEN
        DROP TRIGGER trigger_set_updated_at ON public.consultation_requests;
    END IF;
    
    CREATE TRIGGER trigger_set_updated_at
        BEFORE UPDATE ON public.consultation_requests
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION
    WHEN undefined_table THEN
        NULL;
END $$;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for Consultation Requests
-- Drop existing policies first to prevent "policy already exists" error
DROP POLICY IF EXISTS "Allow public insert of consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated admins to select consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated admins to update consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Allow authenticated admins to delete consultation requests" ON public.consultation_requests;

-- Recreate policies cleanly:
-- (a) Anonymous customers can submit consultation intake requests
CREATE POLICY "Allow public insert of consultation requests"
    ON public.consultation_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- (b) Authenticated staff / doctors can view consultation requests
CREATE POLICY "Allow authenticated admins to select consultation requests"
    ON public.consultation_requests
    FOR SELECT
    TO authenticated
    USING (true);

-- (c) Authenticated staff / doctors can update consultation status and notes
CREATE POLICY "Allow authenticated admins to update consultation requests"
    ON public.consultation_requests
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- (d) Authenticated staff / doctors can delete consultation requests
CREATE POLICY "Allow authenticated admins to delete consultation requests"
    ON public.consultation_requests
    FOR DELETE
    TO authenticated
    USING (true);

-- ==============================================================================
-- 7. Supabase Storage Bucket for Pet Photos ('consultation-photos')
-- ==============================================================================

-- Create bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-photos', 'consultation-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies if present
DROP POLICY IF EXISTS "Allow public photo uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public photo read" ON storage.objects;

-- Allow public / anon users to upload pet photos into consultation-photos bucket
CREATE POLICY "Allow public photo uploads"
    ON storage.objects
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (bucket_id = 'consultation-photos');

-- Allow public viewing of uploaded pet photos
CREATE POLICY "Allow public photo read"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'consultation-photos');
