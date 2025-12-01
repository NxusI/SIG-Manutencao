import Swal from "sweetalert2";
import { useEffect } from "react";
import { AlertProps } from "@/shared/types/components";

export function ToastAlert({
  icon,
  title,
  text,
  position = "bottom-right",
  duration = 3000,
}: AlertProps) {
  useEffect(() => {
    Swal.fire({
      toast: true,
      position,
      icon,
      title,
      text,
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
      background: "#f5f5f5",
      color: "#3a3a4a",
      iconColor:
        icon === "error"
          ? "rgba(192, 13, 13, 0.99)"
          : icon === "success"
          ? "rgba(13, 139, 8, 1)"
          : "rgba(233, 198, 3, 1)",
      customClass: {
        popup: "border border-border rounded-md shadow-md",
        title: "text-sm font-medium",
        htmlContainer: "text-sm",
      },
    });

    return () => {
      Swal.close();
    };
  }, [icon, title, text, position, duration]);

  return null;
}
