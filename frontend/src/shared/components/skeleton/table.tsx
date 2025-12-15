import { TableSkeletonProps } from "@/shared/types/components.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const TableSkeleton = ({ columns, rows }: TableSkeletonProps) => {
  return (
    <Table>
      <TableHeader>
        {Array.from({ length: columns }).map((_, index) => (
          <TableHead key={index}>
            <Skeleton className="bg-muted h-7 w-full animate-pulse" />
          </TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="bg-muted h-7 w-full animate-pulse" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
