export function NewsletterForm() {
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

      <div className="flex h-9.5 items-center justify-between rounded-full bg-zinc-600 ps-4 dark:bg-zinc-800">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter Your Email"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-100 outline-none placeholder:text-zinc-400"
        />
        <button
          type="button"
          className="flex h-full items-center gap-2.5 rounded-full bg-maroon-50 px-4 text-sm font-medium text-maroon-700 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-pink-300 dark:bg-soft-pink-300 dark:text-zinc-800"
        >
          Subscribe
          <ArrowRightIcon />
        </button>
      </div>
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
