export type LeadStatus = "ok" | "error" | "unavailable";

export function getLeadStatus(
  searchParams: Record<string, string | string[] | undefined>,
): LeadStatus | undefined {
  const lead = Array.isArray(searchParams.lead)
    ? searchParams.lead[0]
    : searchParams.lead;

  if (lead === "ok" || lead === "error" || lead === "unavailable") {
    return lead;
  }

  return undefined;
}
