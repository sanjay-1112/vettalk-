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
  // Configurable clinic phone number from env or default placeholder
  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ||
    "919876543210"; // Configure your WhatsApp number in .env.local

  // Clean the phone number (remove +, -, spaces)
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  const message = buildWhatsAppMessage(payload);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
