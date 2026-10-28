/**
 * Generates human-friendly unique consultation reference ID
 * Format: VET-YYYYMMDD-XXXX
 */
export function generateReferenceId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // readable chars without 0/O/1/I confusion
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `VET-${dateStr}-${code}`;
}
