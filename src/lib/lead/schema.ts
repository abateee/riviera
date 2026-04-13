import { z } from "zod";

const frenchPhonePattern =
  /^((\+33|0033)\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/;

function normalizeOptionalString(value: string | undefined) {
  return value?.trim() ?? "";
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(80, "Nom trop long"),
  phone: z
    .string()
    .trim()
    .refine((value) => frenchPhonePattern.test(value), "Téléphone invalide"),
  email: z
    .string()
    .trim()
    .optional()
    .transform(normalizeOptionalString)
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "E-mail invalide",
    }),
  serviceInterest: z
    .string()
    .trim()
    .optional()
    .transform(normalizeOptionalString)
    .pipe(z.string().max(120)),
  preferredCallbackSlot: z
    .string()
    .trim()
    .optional()
    .transform(normalizeOptionalString)
    .pipe(z.string().max(80)),
  message: z
    .string()
    .trim()
    .optional()
    .transform(normalizeOptionalString)
    .pipe(z.string().max(1500)),
  consent: z.string().refine((value) => value === "on", "Consentement requis"),
  pagePath: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || "/"),
  redirectTo: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || "/merci"),
  hp: z
    .string()
    .optional()
    .transform(normalizeOptionalString)
    .refine((value) => value === "", "Spam détecté"),
});

export type LeadSubmission = z.infer<typeof leadSchema> & {
  submittedAt: string;
  userAgent: string;
  ipAddress: string;
};

export function safeRedirectPath(path: string, fallback = "/merci") {
  if (!path.startsWith("/") || path.startsWith("//")) {
    return fallback;
  }

  return path;
}
