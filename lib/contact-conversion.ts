export const GOOGLE_ADS_ID = "AW-18468970130";
export const CONTACT_CONVERSION = "AW-18468970130/2nPGCNuRj4IdEJK92OZE";

type Emit = (command: string, event: string, parameters: Record<string, string>) => void;

// Only an accepted server response can produce a lead. The opaque receipt also
// lets Google Ads deduplicate a repeated notification of the same submission.
export function createContactConversionTracker(emit: Emit) {
  const reported = new Set<string>();
  return (ok: boolean, result: { success?: boolean; submissionId?: string }) => {
    const id = result.submissionId;
    if (!ok || result.success !== true || !id || reported.has(id)) return false;
    reported.add(id);
    for (const [event, parameters] of [
      ["generate_lead", { send_to: "G-T23JJH27FJ", form_name: "contact_enquiry" }],
      ["conversion", { send_to: CONTACT_CONVERSION, transaction_id: id }],
    ] as const) {
      // Analytics failures must never turn a delivered enquiry into a form error.
      try { emit("event", event, parameters); } catch { /* Form delivery already succeeded. */ }
    }
    return true;
  };
}
