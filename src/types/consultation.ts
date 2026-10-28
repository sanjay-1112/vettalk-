export type PetType = 'Dog' | 'Cat' | 'Other';
export type PetGender = 'Male' | 'Female' | 'Unknown';
export type ProblemDuration =
  | 'Today'
  | 'Yesterday'
  | '2-3 days ago'
  | 'More than 3 days ago'
  | 'Not sure';

export type ConsultationStatus =
  | 'new'
  | 'waiting'
  | 'in_consultation'
  | 'completed'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'waived';

export interface ConsultationRequest {
  id: string;
  created_at: string;
  reference_id: string;
  owner_name: string;
  mobile_number: string;
  city?: string | null;
  pet_name: string;
  pet_type: PetType;
  breed?: string | null;
  pet_age?: string | null;
  pet_gender: PetGender;
  main_concern: string;
  problem_duration: ProblemDuration;
  photo_url?: string | null;
  consultation_status: ConsultationStatus;
  payment_status: PaymentStatus;
  consultation_amount: number;
  admin_notes?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
}

export interface ConsultationFormData {
  // Owner info
  owner_name: string;
  mobile_number: string;
  city: string;
  // Pet info
  pet_name: string;
  pet_type: PetType;
  breed: string;
  pet_age: string;
  pet_gender: PetGender;
  // Medical
  main_concern: string;
  problem_duration: ProblemDuration;
  photo_url?: string;
  // Safety
  disclaimer_accepted: boolean;
  // UTM
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}
