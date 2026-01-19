import { TipoUsuario } from "@/domain/usuario/entities/usuario.entity";
import { LucideIcon } from "lucide-react";
import { Matcher } from "react-day-picker";
import { ActionMeta, SingleValue } from "react-select";

export interface AlertProps {
  icon: "success" | "error" | "warning";
  title: string;
  text?: string;
  duration?: number;
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left";
  onClose?: () => void;
}

export interface TableSkeletonProps {
  rows: number;
  columns: number;
}

export interface DataTableProps<T> {
  columns: (keyof T)[];
  columnLabels: Partial<Record<keyof T, string>>;
  data: T[] | null;
  getRowId: (row: T) => string | number | undefined;
  columnClasses?: Partial<Record<keyof T, string>>;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface BaseModalProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface OptionFormatted {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: OptionFormatted[];
  onChange: (
    newValue: SingleValue<OptionFormatted>,
    actionMeta: ActionMeta<OptionFormatted>,
  ) => void;
  value: OptionFormatted | null;
  disable?: boolean;
  loading?: boolean;
  onSearchInputChange?: (value: string) => void;
  className?: string;
}

export interface ConfirmDialogProps {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  buttonColor?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  disable?: Matcher;
  from?: Date;
  to?: Date;
}

export interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  permission?: TipoUsuario[];
  items?: MenuItem[];
}
