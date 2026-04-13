import { NextResponse } from "next/server";

import { sendLeadNotification } from "@/lib/lead/notify";
import { leadSchema, safeRedirectPath } from "@/lib/lead/schema";
import { saveLead } from "@/lib/lead/store";
import type { LeadStatus } from "@/lib/lead/status";

function redirectWithStatus(
  requestUrl: string,
  path: string,
  status: LeadStatus,
  options?: {
    fallbackPath?: string;
    anchor?: string;
  },
) {
  const url = new URL(
    safeRedirectPath(path, options?.fallbackPath),
    requestUrl,
  );
  url.searchParams.set("lead", status);

  if (options?.anchor) {
    url.hash = options.anchor;
  }

  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawValues = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
  );

  const parsed = leadSchema.safeParse(rawValues);
  const pagePath =
    typeof rawValues.pagePath === "string" ? rawValues.pagePath : "/contact";

  if (!parsed.success) {
    return redirectWithStatus(request.url, pagePath, "error", {
      fallbackPath: "/contact",
      anchor: "formulaire",
    });
  }

  const lead = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
    ipAddress:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "",
  };

  const [saveResult, notifyResult] = await Promise.allSettled([
    saveLead(lead),
    sendLeadNotification(lead),
  ]);

  const persisted =
    saveResult.status === "fulfilled" && saveResult.value.persisted;
  const notified =
    notifyResult.status === "fulfilled" && notifyResult.value.notified;

  if (!persisted && !notified) {
    console.error("Lead delivery unavailable", {
      pagePath: lead.pagePath,
      saveResult,
      notifyResult,
    });

    return redirectWithStatus(request.url, pagePath, "unavailable", {
      fallbackPath: "/contact",
      anchor: "formulaire",
    });
  }

  return redirectWithStatus(request.url, parsed.data.redirectTo, "ok");
}
