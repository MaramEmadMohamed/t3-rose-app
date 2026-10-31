import { z } from "zod";

// Messages are translation keys from the "Footer" namespace.
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .pipe(z.email("emailInvalid")),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
