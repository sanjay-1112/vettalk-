/**
 * Internal Notification Dispatcher for VetTalk Team
 * Manages backup WhatsApp alert numbers (hidden from patients)
 */

import { formatWhatsAppPhone } from "./whatsapp";

// Primary patient-facing WhatsApp number
export const PRIMARY_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "918919468165";

// Internal backup team numbers (not exposed to patients)
export const BACKUP_TEAM_NUMBERS = [
  {
    name: "Backup 1 (Sanjay)",
    phone: process.env.BACKUP_WHATSAPP_PHONE_1 || "919821386262",
    label: "9821386262",
  },
  {
    name: "Backup 2 (Support)",
    phone: process.env.BACKUP_WHATSAPP_PHONE_2 || "918373916196",
    label: "8373916196",
  },
];

export interface NotificationPayload {
  referenceId: string;
  ownerName: string;
  ownerPhone: string;
  city?: string | null;
  petName: string;
  petType: string;
  breed?: string | null;
  petAge?: string | null;
  mainConcern: string;
  problemDuration?: string;
  preferredSlot?: string | null;
  photoUrl?: string | null;
}

/**
 * Constructs an internal alert message for the backup doctor/admin team
 */
export function buildTeamAlertMessage(payload: NotificationPayload): string {
  const ageDisplay = payload.petAge ? payload.petAge : "Not specified";
  const cityDisplay = payload.city ? payload.city : "Not specified";
  const slotLine = payload.preferredSlot ? `*Preferred Slot:* ${payload.preferredSlot}\n` : "";

  return `🚨 *NEW VETTALK CASE LOGGED*

*Ref:* ${payload.referenceId}
*Owner:* ${payload.ownerName}
*Phone:* +91 ${payload.ownerPhone}
*City:* ${cityDisplay}

*Pet:* ${payload.petName} (${payload.petType})
*Age:* ${ageDisplay}
${payload.breed ? `*Breed:* ${payload.breed}\n` : ""}${slotLine}*Concern:*
${payload.mainConcern.trim()}

*Fee:* Flat ₹200 (UPI: sanjay1112198@okicici)
*Primary Vet on Call:* Dr. R. Soni (918919468165)

*Direct WhatsApp to Patient:*
https://wa.me/${formatWhatsAppPhone(payload.ownerPhone)}`;
}

/**
 * Returns WhatsApp click-to-chat URL to alert a specific team member
 */
export function getTeamAlertWhatsAppUrl(
  recipientPhone: string,
  payload: NotificationPayload
): string {
  const cleanPhone = formatWhatsAppPhone(recipientPhone);
  const message = buildTeamAlertMessage(payload);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Dispatches automated notifications on the server when a new consultation is created.
 * Hidden from the public client.
 */
export async function dispatchBackendConsultationNotification(
  payload: NotificationPayload
): Promise<void> {
  const alertText = buildTeamAlertMessage(payload);

  // 1. Log to server console for monitoring
  console.log(
    `[TEAM ALERT] New consultation #${payload.referenceId} submitted by ${payload.ownerName} (+91 ${payload.ownerPhone}). Slot: ${payload.preferredSlot || "Not specified"}`
  );
  console.log(
    `[TEAM ALERT] Backup notification targets: ${BACKUP_TEAM_NUMBERS.map(
      (t) => `${t.name}: ${t.phone}`
    ).join(", ")}`
  );

  // 2. Optional: Send to external Webhook (Zapier, Make, Telegram, Discord, Slack, etc.) if configured
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "new_consultation_request",
          timestamp: new Date().toISOString(),
          reference_id: payload.referenceId,
          owner_name: payload.ownerName,
          owner_phone: payload.ownerPhone,
          pet_name: payload.petName,
          pet_type: payload.petType,
          main_concern: payload.mainConcern,
          preferred_slot: payload.preferredSlot,
          consultation_fee: 200,
          upi_id: "sanjay1112198@okicici",
          primary_doctor_phone: PRIMARY_WHATSAPP_PHONE,
          backup_alert_phones: BACKUP_TEAM_NUMBERS.map((t) => t.phone),
          whatsapp_alert_urls: BACKUP_TEAM_NUMBERS.map((t) => ({
            name: t.name,
            phone: t.phone,
            url: getTeamAlertWhatsAppUrl(t.phone, payload),
          })),
        }),
      });
      console.log(`[TEAM ALERT] Webhook dispatched successfully.`);
    } catch (err: unknown) {
      console.warn(`[TEAM ALERT] Webhook dispatch error:`, err);
    }
  }

  // 3. Optional: CallMeBot automated WhatsApp message service if API keys are set
  const callmebotKey1 = process.env.CALLMEBOT_API_KEY_1;
  const callmebotKey2 = process.env.CALLMEBOT_API_KEY_2;

  const sendCallMeBot = async (phone: string, apikey: string) => {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(
        alertText
      )}&apikey=${apikey}`;
      await fetch(url);
    } catch (e) {
      console.warn(`[TEAM ALERT] CallMeBot error for ${phone}:`, e);
    }
  };

  if (callmebotKey1) {
    sendCallMeBot(BACKUP_TEAM_NUMBERS[0].phone, callmebotKey1);
  }
  if (callmebotKey2) {
    sendCallMeBot(BACKUP_TEAM_NUMBERS[1].phone, callmebotKey2);
  }
}
