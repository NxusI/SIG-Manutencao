import { TableSkeletonProps } from "@/shared/types/components";
import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = ({ columns, rows }: TableSkeletonProps) => {
  return (
    <TableRow>
      {Array.from({ length: columns }).map((_, index) => (
        <TableCell key={index}>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <Skeleton className="bg-muted h-7 w-full animate-pulse" />
          ))}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableSkeleton;
