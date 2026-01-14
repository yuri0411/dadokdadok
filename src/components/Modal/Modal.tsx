import { createPortal } from "react-dom";
import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { Button, Typography } from "@/components";

type ModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    open: boolean;
    title?: string;
    closeText?: string;
    confirmText?: string;
    onClose?: () => void;
    onConfirm?: () => void;
  }>;

export const Modal = ({
  open,
  title,
  closeText = "취소",
  confirmText = "확인",
  onClose,
  onConfirm,
  children,
  ...modalProps
}: ModalProps) => {
  const portalRoot = document.getElementById("content-root");

  if (!portalRoot) return null;
  if (!open) return null;
  return createPortal(
    <div className={styles.backdrop} {...modalProps}>
      <div className={styles.modal}>
        {title && (
          <Typography as="h3" variant="h3" align="center">
            {title}
          </Typography>
        )}
        <div className={styles.content}>{children}</div>
        <div className={styles.actionWrapper}>
          <Button variant="outlined" color="tertiary" onClick={onClose}>
            {closeText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>,
    portalRoot
  );
};
