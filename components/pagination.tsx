import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  page: number
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalItems,
  page,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems);

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="default"
        className="text-white"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span className="">
        {page} / {totalPages}
      </span>
      <Button
        variant="default"
        className="text-white"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
