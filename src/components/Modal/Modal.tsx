import { type HTMLAttributes, type PropsWithChildren, useEffect, useId, useRef } from "react";

import { createPortal } from "react-dom";

import { Button } from "@/components/Button/Button";
import { Typography } from "@/components/Typography/Typography";

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

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !portalRoot || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const background: Array<{ element: HTMLElement; wasInert: boolean }> = [];
    let current: HTMLElement | null = portalRoot;
    let child: HTMLElement = dialog.parentElement ?? portalRoot;

    // The portal is inside the app layout, so disable siblings at every ancestor.
    while (current) {
      for (const sibling of current.children) {
        if (sibling !== child && sibling instanceof HTMLElement) {
          background.push({ element: sibling, wasInert: sibling.hasAttribute("inert") });
          sibling.setAttribute("inert", "");
        }
      }
      child = current;
      current = current.parentElement;
    }

    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    (focusable()[0] ?? dialog).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (closeOnEscape) onCloseRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const elements = focusable();
      const first = elements[0] ?? dialog;
      const last = elements.at(-1) ?? dialog;
      const active = document.activeElement;
      if (elements.length === 0 || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const keepFocusInside = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) (focusable()[0] ?? dialog).focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocusInside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocusInside);
      for (const { element, wasInert } of background) {
        if (!wasInert) element.removeAttribute("inert");
      }
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [closeOnEscape, open, portalRoot]);

  if (!portalRoot) return null;
  if (!open) return null;
  return createPortal(
    <div
      className={`${styles.backdrop}${className ? ` ${className}` : ""}`}
      onClick={closeOnBackdrop ? onClose : undefined}
      {...modalProps}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        tabIndex={-1}
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
