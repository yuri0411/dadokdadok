import { type HTMLAttributes, type PropsWithChildren, useEffect, useId, useRef } from "react";

import { createPortal } from "react-dom";

import { Typography } from "@/components";

import styles from "./Modal.module.css";

export type FeedbackModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    open: boolean;
    title?: string;
    durationMs?: number;
    onClose?: () => void;
    closeOnBackdrop?: boolean;
  }>;

export const FeedbackModal = ({
  open,
  title,
  durationMs = 3000,
  onClose,
  closeOnBackdrop = true,
  children,
  ...modalProps
}: FeedbackModalProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const portalRoot = document.getElementById("content-root");
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    timerRef.current = setTimeout(() => {
      onClose?.();
    }, durationMs);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, durationMs, onClose]);

  if (!portalRoot || !open) return null;

  return createPortal(
    <div
      {...modalProps}
      className={styles.backdrop}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={styles.modal}
        role="status"
        aria-live="polite"
        aria-labelledby={title ? titleId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <Typography id={titleId} as="h3" variant="h3" align="center">
            {title}
          </Typography>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    portalRoot
  );
};
