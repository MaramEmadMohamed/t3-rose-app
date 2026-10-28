"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { HTTP_STATUS } from "@/shared/constants/api";
import { ApiError } from "@/shared/lib/api/api-client";
import { subscribeToNewsletter } from "@/shared/lib/api/newsletter";

import { newsletterSchema, type NewsletterValues } from "./newsletter-schema";

const EMAIL_ERROR_ID = "newsletter-email-error";

function getSubscribeErrorMessage(error: Error) {
  if (error instanceof ApiError && error.status === HTTP_STATUS.CONFLICT) {
    return "This email is already subscribed";
  }

  return "Something went wrong. Please try again.";
}

export function NewsletterForm() {
  // Mutation
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => toast.success("You have subscribed to our newsletter"),
    onError: (error) => toast.error(getSubscribeErrorMessage(error)),
  });

  // Form
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  // Variables
  const emailError = form.formState.errors.email?.message;

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
          Get <span className="text-zinc-100">20%</span> Off Discount Coupon
        </h2>
        <p className="text-sm text-zinc-500">By subscribing to our newsletter</p>
      </div>

      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubscribe)}
        className="flex flex-col gap-1.5"
      >
        <div className="flex h-9.5 items-center justify-between rounded-full bg-zinc-600 ps-4 dark:bg-zinc-800">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Enter Your Email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? EMAIL_ERROR_ID : undefined}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-100 outline-none placeholder:text-zinc-400"
            {...form.register("email")}
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex h-full items-center gap-2.5 rounded-full bg-maroon-50 px-4 text-sm font-medium text-maroon-700 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-pink-300 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-soft-pink-300 dark:text-zinc-800"
          >
            Subscribe
            <ArrowRightIcon />
          </button>
        </div>

        {emailError && (
          <p id={EMAIL_ERROR_ID} role="alert" className="ps-4 text-sm text-red-400">
            {emailError}
          </p>
        )}
      </form>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 rtl:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
