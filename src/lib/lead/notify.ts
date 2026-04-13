import { Resend } from "resend";

import type { LeadSubmission } from "@/lib/lead/schema";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function line(label: string, value: string) {
  return `<p style="margin:0 0 8px"><strong>${label}</strong><br/>${value}</p>`;
}

export async function sendLeadNotification(lead: LeadSubmission) {
  const to = process.env.LEAD_TO_EMAIL;

  if (!resend || !to) {
    return { notified: false, reason: "Resend not configured" } as const;
  }

  const from =
    process.env.LEAD_FROM_EMAIL ??
    "Riviera Compagnie <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: [to],
    subject: `Nouveau contact Riviera Compagnie - ${lead.name}`,
    replyTo: lead.email || undefined,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#14213d">
        <h1 style="margin:0 0 20px;font-size:24px">Nouveau contact site web</h1>
        ${line("Nom", lead.name)}
        ${line("Téléphone", lead.phone)}
        ${lead.email ? line("E-mail", lead.email) : ""}
        ${lead.serviceInterest ? line("Service", lead.serviceInterest) : ""}
        ${
          lead.preferredCallbackSlot
            ? line("Créneau souhaité", lead.preferredCallbackSlot)
            : ""
        }
        ${lead.message ? line("Message", lead.message) : ""}
        ${line("Page d'origine", lead.pagePath)}
        ${line("Date", new Date(lead.submittedAt).toLocaleString("fr-FR"))}
      </div>
    `,
  });

  return { notified: true } as const;
}
