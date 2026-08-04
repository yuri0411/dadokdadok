import { type HTMLAttributes, type PropsWithChildren, useEffect, useId } from "react";

import { createPortal } from "react-dom";

import { Button, Typography } from "@/components";

import styles from "./Modal.module.css";

export type ModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    open: boolean;
    title?: string;
    closeText?: string;
    confirmText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    confirmLoading?: boolean;
  }>;

export const Modal = ({
  open,
  title,
  closeText = "취소",
  confirmText = "확인",
  onClose,
  onConfirm,
  closeOnBackdrop = true,
  closeOnEscape = true,
  confirmLoading = false,
  children,
  className,
  ...modalProps
}: ModalProps) => {
  const portalRoot = document.getElementById("content-root");
  const titleId = useId();

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeOnEscape, onClose, open]);

  if (!portalRoot) return null;
  if (!open) return null;
  return createPortal(
    <div
      className={`${styles.backdrop}${className ? ` ${className}` : ""}`}
      onClick={closeOnBackdrop ? onClose : undefined}
      {...modalProps}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <Typography id={titleId} as="h3" variant="h3" align="center">
            {title}
          </Typography>
        )}
        <div className={styles.content}>{children}</div>
        <div className={styles.actionWrapper}>
          <Button variant="outlined" color="tertiary" onClick={onClose}>
            {closeText}
          </Button>
          <Button onClick={onConfirm} loading={confirmLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    portalRoot
  );
};
