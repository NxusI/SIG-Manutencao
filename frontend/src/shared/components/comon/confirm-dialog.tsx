import { ConfirmDialogProps } from '@/shared/types/components.types';
import Swal from 'sweetalert2';

export function ConfirmDialog({
  title,
  text,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  buttonColor = '#3A3A4A'
}: ConfirmDialogProps) {
  const showDialog = () => {
    Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: buttonColor,
      background: 'var(--card)',
      color: 'var(--secondary-foreground',
      customClass: {
        popup: 'border border-[#3A3A4A] rounded-md shadow-lg',
        confirmButton: 'bg-primary hover:bg-primary/90',
        cancelButton: 'bg-secondary hover:bg-secondary/80'
      },
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (onCancel) {
        onCancel();
      }
    });
  };

  return { showDialog };
}