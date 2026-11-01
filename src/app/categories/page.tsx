import { redirect } from "next/navigation";

import { getCategories } from "@/services/categories";
import { PaginationControls } from "@/components/ui/pagination";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

type CategoriesPageProps = {
  searchParams: SearchParams;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

function getValidPositiveInteger(
  value: string | string[] | undefined,
  fallback: number
): number {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    return fallback;
  }

  const number = Number(value);

  if (!Number.isSafeInteger(number) || number < 1) {
    return fallback;
  }

  return number;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const params = await searchParams;

  const page = getValidPositiveInteger(
    params.page,
    DEFAULT_PAGE
  );

  const limit = getValidPositiveInteger(
    params.limit,
    DEFAULT_LIMIT
  );

  const response = await getCategories(page, limit);

  const { data: categories, metadata } = response.payload;

  const totalPages = metadata.totalPages;

  // Correct the URL if the requested page exceeds the available pages.
  if (totalPages > 0 && page > totalPages) {
    const correctedParams = new URLSearchParams();

    correctedParams.set("page", String(totalPages));
    correctedParams.set("limit", String(limit));

    redirect(`/categories?${correctedParams.toString()}`);
  }

  // Correct missing or invalid query parameters.
  const hasInvalidPage =
    params.page !== String(page);

  const hasInvalidLimit =
    params.limit !== String(limit);

  if (hasInvalidPage || hasInvalidLimit) {
    const correctedParams = new URLSearchParams();

    correctedParams.set("page", String(page));
    correctedParams.set("limit", String(limit));

    redirect(`/categories?${correctedParams.toString()}`);
  }

  function createPageUrl(targetPage: number) {
    const queryParams = new URLSearchParams();

    // Preserve other query parameters.
    Object.entries(params).forEach(([key, value]) => {
      if (key === "page" || key === "limit") return;

      if (typeof value === "string") {
        queryParams.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item));
      }
    });

    queryParams.set("page", String(targetPage));
    queryParams.set("limit", String(limit));

    return `/categories?${queryParams.toString()}`;
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Total categories: {metadata.total}
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          No categories found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.id}
              className="rounded-lg border bg-card p-4"
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.title}
                  className="mb-3 h-40 w-full rounded-md object-cover"
                />
              )}

              <h2 className="font-semibold">
                {category.title}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {category.description || "No description"}
              </p>

              <p className="mt-3 text-xs text-muted-foreground">
                Products: {category._count.products}
              </p>
            </article>
          ))}
        </div>
      )}

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        createPageUrl={createPageUrl}
      />
    </main>
  );
}