import { Button } from "@/shared/components/ui/button";
import { PaginationProps } from "@/shared/types/components.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const siblingCount = 1;

  const paginationRange = (() => {
    if (totalPages <= 7) return range(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    let pages: (number | string)[] = [];

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 4);
      pages = [...leftRange, "...", lastPage - 1, lastPage];
    } else if (showLeftDots && !showRightDots) {
      const rightRange = range(totalPages - 3, totalPages);
      pages = [firstPage, firstPage + 1, "...", ...rightRange];
    } else if (showLeftDots && showRightDots) {
      pages = [
        firstPage,
        "...",
        leftSibling,
        currentPage,
        rightSibling,
        "...",
        lastPage,
      ];
    }

    return pages;
  })();

  return (
    <div
      className="flex items-center justify-center gap-2 mt-4"
      role="navigation"
      aria-label="Pagination"
    >
      <Button
        size="sm"
        variant="ghost"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-w-[2rem]"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {paginationRange.map((p, idx) =>
        typeof p === "string" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-sm select-none">
            {p}
          </span>
        ) : (
          <Button
            key={p}
            size="sm"
            variant={p === currentPage ? "default" : "ghost"}
            onClick={() => goTo(p)}
            className={cn(
              "min-w-[2rem]",
              p === currentPage ? "font-semibold" : ""
            )}
          >
            {p}
          </Button>
        )
      )}

      <Button
        size="sm"
        variant="ghost"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-w-[2rem]"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
