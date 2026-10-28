/**
 * WhatsApp integration utility
 * Constructs standard WhatsApp click-to-chat link
 */

export interface WhatsAppMessagePayload {
  referenceId: string;
  ownerName: string;
  ownerPhone?: string;
  petName: string;
  petType: string;
  petAge?: string;
  mainConcern: string;
}

export function buildWhatsAppMessage(payload: WhatsAppMessagePayload): string {
  const ageDisplay = payload.petAge ? payload.petAge : "Not specified";
  const phoneLine = payload.ownerPhone ? `Phone: +91 ${payload.ownerPhone}\n` : "";

  return `Hello,

I would like to consult a veterinarian on VetTalk (24*7).

Consultation Ref: ${payload.referenceId}

Owner: ${payload.ownerName}
${phoneLine}Pet: ${payload.petName}
Pet Type: ${payload.petType}
Age: ${ageDisplay}

Concern:
${payload.mainConcern.trim()}

Please help me connect for the consultation.`;
}

/**
 * Returns the click-to-chat URL with encoded message
 */
export function getWhatsAppUrl(payload: WhatsAppMessagePayload): string {
  // Configurable clinic phone number from env, with Dr. R. Soni's number as verified default
  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ||
    "918919468165";

  // Clean the phone number (remove +, -, spaces)
  let cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  // Auto-prepend India country code (91) if 10-digit number is passed (e.g. 8919468165 -> 918919468165)
  if (cleanNumber.length === 10) {
    cleanNumber = `91${cleanNumber}`;
  }

  const message = buildWhatsAppMessage(payload);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
