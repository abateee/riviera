import postgres from "postgres";

import type { LeadSubmission } from "@/lib/lead/schema";

const connectionString = process.env.POSTGRES_URL;
const sql = connectionString
  ? postgres(connectionString, {
      prepare: false,
      ssl: "require",
      max: 1,
    })
  : null;

let leadTablePromise: Promise<void> | null = null;

async function ensureLeadTable() {
  if (!sql) {
    return;
  }

  if (!leadTablePromise) {
    leadTablePromise = sql`
      create table if not exists leads (
        id serial primary key,
        submitted_at timestamptz not null default now(),
        name text not null,
        phone text not null,
        email text,
        service_interest text,
        preferred_callback_slot text,
        message text,
        page_path text,
        user_agent text,
        ip_address text
      )
    `.then(() => undefined);
  }

  await leadTablePromise;
}

export async function saveLead(lead: LeadSubmission) {
  if (!sql) {
    return { persisted: false, reason: "POSTGRES_URL missing" } as const;
  }

  await ensureLeadTable();

  await sql`
    insert into leads (
      submitted_at,
      name,
      phone,
      email,
      service_interest,
      preferred_callback_slot,
      message,
      page_path,
      user_agent,
      ip_address
    ) values (
      ${lead.submittedAt},
      ${lead.name},
      ${lead.phone},
      ${lead.email || null},
      ${lead.serviceInterest || null},
      ${lead.preferredCallbackSlot || null},
      ${lead.message || null},
      ${lead.pagePath},
      ${lead.userAgent || null},
      ${lead.ipAddress || null}
    )
  `;

  return { persisted: true } as const;
}

