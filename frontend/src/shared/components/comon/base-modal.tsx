"use client"

import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { BaseModalProps } from "@/shared/types/components.types";

export default function BaseModal({
  title,
  description,
  trigger,
  children,
  open,
  onOpenChange,
  size = "sm",
}: BaseModalProps) {
  const sizeClasses = {
    sm: "!max-w-md",
    md: "!max-w-xl",
    lg: "!max-w-2xl",
    xl: "!max-w-4xl",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (
            typeof document !== "undefined" &&
            document.body.classList.contains("select-open")
          ) {
            e.preventDefault();
          }
        }}
        className={clsx(
          "w-full rounded-lg p-0",
          "!max-h-[90vh] overflow-hidden flex flex-col",
          sizeClasses[size],
        )}
        style={{
          backgroundColor: "var(--color-card)",
          color: "var(--color-card-foreground)",
          zIndex: 9999,
        }}
      >
        <DialogHeader className="p-6 pb-3 border-b border-white/10">
          <DialogTitle className="text-xl font-semibold leading-tight">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-sm opacity-80 leading-snug mt-1">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div
          className="
            flex-1 
            overflow-y-auto 
            px-6 
            pb-10 
            min-h-[50px] 
            space-y-6
          "
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
