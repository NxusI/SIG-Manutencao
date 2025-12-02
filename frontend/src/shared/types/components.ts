export interface AlertProps {
  icon: "success" | "error" | "warning";
  title: string;
  text?: string;
  duration?: number;
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  onClose?: () => void;
}

export interface TableSkeletonProps{
  rows: number;
  columns: number;
}