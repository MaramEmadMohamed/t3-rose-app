import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(
        "mx-auto flex w-full items-center justify-center",
        className
      )}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      className={cn(
        "size-8 rounded-[8px] border border-gray-200 bg-white p-2.5 text-lg font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600",
        isActive &&
          "border-[#58191f]! bg-[#58191f]! text-white! hover:bg-[#58191f]! dark:border-[#ff9fba]! dark:bg-[#ff9fba]! dark:text-[#27272a]! dark:hover:bg-[#ff9fba]!",
        props["aria-disabled"] &&
          "pointer-events-none cursor-not-allowed opacity-40",
        className
      )}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function PaginationFirst({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="icon"
      className={cn("size-8 rounded-lg border p-1.5", className)}
      {...props}
    >
      <ChevronsLeftIcon className="size-4" />
    </PaginationLink>
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="icon"
      className={cn("size-8 rounded-lg border p-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4 shrink-0" />
      <span className="sr-only">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="icon"
      className={cn("size-8 rounded-lg border p-2.5", className)}
      {...props}
    >
      <ChevronRightIcon className="size-4 shrink-0" />
      <span className="sr-only">{text}</span>
    </PaginationLink>
  );
}

function PaginationLast({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="icon"
      className={cn("size-8 rounded-lg border p-1.5", className)}
      {...props}
    >
      <ChevronsRightIcon className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center text-gray-800 dark:text-white [&_svg]:size-5",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
};

type PageItem = number | "ellipsis";

function getVisiblePages(
  currentPage: number,
  totalPages: number
): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

function PaginationControls({
  currentPage,
  totalPages,
  createPageUrl,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            href={createPageUrl(1)}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(Math.max(1, currentPage - 1))}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={createPageUrl(Math.min(totalPages, currentPage + 1))}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLast
            href={createPageUrl(totalPages)}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationLast,
  PaginationPrevious,
  PaginationNext,
  PaginationControls,
};