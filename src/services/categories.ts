import { CategoriesResponse } from "@/app/types/categories";


export async function getCategories(
  page: number,
  limit: number
): Promise<CategoriesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(
    `https://rose-app.elevate-bootcamp.cloud/api/categories?${params}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: CategoriesResponse = await response.json();

  if (!result.status) {
    throw new Error("Failed to load categories");
  }

  return result;
}