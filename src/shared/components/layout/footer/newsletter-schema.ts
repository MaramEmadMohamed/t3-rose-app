import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .pipe(z.email("Please enter a valid email address")),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
