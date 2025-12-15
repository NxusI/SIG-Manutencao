import { useEffect, useRef } from "react";
import { toast } from "../ui/sonner";

type ToastAlertProps = {
  icon?: "success" | "error" | "warning" | "info" | "loading";
  title?: string | any[];
  text?: string | any[];
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  timer?: number;
};

export function ToastAlert({
  icon = "info",
  title,
  text,
  position = "bottom-right",
  timer = 3000,
}: ToastAlertProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const content = text ?? title;

    if (!content) return;

    if (Array.isArray(content)) {
      content.forEach((item) => {
        const message =
          typeof item === "string"
            ? item
            : item?.message || JSON.stringify(item);

        toast[icon](message, {
          duration: timer,
          position,
        });
      });

      return;
    }

    toast[icon](content, {
      duration: timer,
      position,
    });
  }, [icon, title, text, position, timer]);

  return null;
}
