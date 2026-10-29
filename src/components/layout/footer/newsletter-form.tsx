"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ApiError } from "@/lib/api/api-client";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { HTTP_STATUS } from "@/lib/constants/api";

import { newsletterSchema, type NewsletterValues } from "./newsletter-schema";

const EMAIL_ERROR_ID = "newsletter-email-error";

function getSubscribeErrorKey(error: Error) {
  if (error instanceof ApiError && error.status === HTTP_STATUS.CONFLICT) {
    return "alreadySubscribed";
  }

  return "genericError";
}

export function NewsletterForm() {
  // Translation
  const t = useTranslations("Footer");

  // Mutation
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => toast.success(t("subscribeSuccess")),
    onError: (error) => toast.error(t(getSubscribeErrorKey(error))),
  });

  // Form
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  // Variables
  const emailErrorKey = form.formState.errors.email?.message;

  // Functions
  function handleSubscribe(values: NewsletterValues) {
    subscribe(values.email, { onSuccess: () => form.reset() });
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="flex w-full max-w-sm flex-col gap-5"
    >
      <div>
        <h2
          id="newsletter-title"
          className="text-xl font-semibold text-soft-pink-300"
        >
          {t.rich("newsletterTitle", {
            highlight: (chunks) => (
              <span className="text-zinc-100">{chunks}</span>
            ),
          })}
        </h2>
        <p className="text-sm text-zinc-500">{t("newsletterSubtitle")}</p>
      </div>

      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubscribe)}
        className="flex flex-col gap-1.5"
      >
        <div className="flex h-9.5 items-center justify-between rounded-full bg-zinc-600 ps-4 dark:bg-zinc-800">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("emailLabel")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(emailErrorKey)}
            aria-describedby={emailErrorKey ? EMAIL_ERROR_ID : undefined}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-100 outline-none placeholder:text-zinc-400"
            {...form.register("email")}
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex h-full items-center gap-2.5 rounded-full bg-maroon-50 px-4 text-sm font-medium text-maroon-700 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-pink-300 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-soft-pink-300 dark:text-zinc-800"
          >
            {t("subscribe")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          </button>
        </div>

        {emailErrorKey && (
          <p
            id={EMAIL_ERROR_ID}
            role="alert"
            className="ps-4 text-sm text-danger"
          >
            {t(emailErrorKey)}
          </p>
        )}
      </form>
    </section>
  );
}
