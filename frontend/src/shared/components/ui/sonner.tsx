"use client"

import {
  CircleCheck,
  Info,
  Loader2,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  ToasterProps,
} from "sonner";

export const toast = sonnerToast;

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      position="top-right"
      icons={{
        success: <CircleCheck className="size-4 text-green-600" />,
        info: <Info className="size-4" />,
        warning: <TriangleAlert className="size-4 text-yellow-600" />,
        error: <XCircle className="size-4 text-red-600" />,
        loading: <Loader2 className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "black",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",

          "--success-border": "rgb(22 163 74)",
          "--info-border": "rgb(37 99 235)",
          "--warning-border": "rgb(202 138 4)",
          "--error-border": "rgb(220 38 38)",
          "--loading-border": "var(--border)",

          "--success-bg": "var(--card)",
          "--info-bg": "var(--card)",
          "--warning-bg": "var(--card)",
          "--error-bg": "var(--card)",
          "--loading-bg": "var(--card)",

          "--success-text": "black",
          "--info-text": "black",
          "--warning-text": "black",
          "--error-text": "black",
          "--loading-text": "black",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
