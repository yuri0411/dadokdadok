import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";

describe("Modal", () => {
  beforeEach(() => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "content-root";
    document.body.append(portalRoot);
  });

  it("dialog aria 속성과 제목 연결을 올바르게 적용한다", () => {
    render(
      <Modal open title="학습 종료">
        내용
      </Modal>
    );

    const dialog = screen.getByRole("dialog", { name: "학습 종료" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", screen.getByRole("heading").id);
  });

  it("시각적 제목 없이 aria-label로 대화상자 이름을 제공한다", () => {
    render(
      <Modal open aria-label="학습 종료 확인">
        내용
      </Modal>
    );

    const dialog = screen.getByRole("dialog", { name: "학습 종료 확인" });
    expect(dialog).toHaveAttribute("aria-label", "학습 종료 확인");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("Escape와 배경 클릭으로 닫을 수 있다", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Modal open title="학습 종료" onClose={onClose}>
        내용
      </Modal>
    );

    await user.keyboard("{Escape}");
    await user.click(container.ownerDocument.querySelector("#content-root > div")!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("본문 클릭은 닫기 동작을 발생시키지 않는다", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open title="학습 종료" onClose={onClose}>
        본문 내용
      </Modal>
    );

    await user.click(screen.getByText("본문 내용"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("confirmLoading이면 확인 버튼을 busy 및 disabled 상태로 만든다", () => {
    render(
      <Modal open title="저장" confirmLoading confirmText="확인">
        내용
      </Modal>
    );

    const confirmButton = screen.getByRole("button", { name: "처리 중" });
    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveAttribute("aria-busy", "true");
  });
  it("확인 처리 중 중복 실행을 막고 완료 후 확인 동작을 복원한다", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const { rerender } = render(<Modal open title="저장" confirmLoading onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "처리 중" }));
    expect(onConfirm).not.toHaveBeenCalled();

    rerender(<Modal open title="저장" onConfirm={onConfirm} />);
    const button = screen.getByRole("button", { name: "확인" });
    expect(button).not.toHaveAttribute("aria-busy");
    expect(button).toBeEnabled();
    await user.click(button);
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("열릴 때 포커스를 옮기고 Tab과 Shift+Tab을 모달 안에서 순환시킨다", async () => {
    const user = userEvent.setup();
    render(<Modal open title="학습 종료" />);
    const close = screen.getByRole("button", { name: "취소" });
    const confirm = screen.getByRole("button", { name: "확인" });
    expect(close).toHaveFocus();
    await user.tab();
    expect(confirm).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(confirm).toHaveFocus();
  });

  it("배경을 비활성화하고 모달이 닫히면 이전 포커스를 복원한다", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "학습 종료 열기";
    document.body.append(trigger);
    trigger.focus();
    const { rerender } = render(<Modal open title="학습 종료" />);
    const dialog = screen.getByRole("dialog", { name: "학습 종료" });
    expect(trigger).toHaveAttribute("inert");
    trigger.focus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    rerender(<Modal open={false} title="학습 종료" />);
    expect(trigger).not.toHaveAttribute("inert");
    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it("포털이 화면 레이아웃 안에 있어도 바깥 영역을 비활성화한다", () => {
    const portal = document.getElementById("content-root")!;
    const layout = document.createElement("div");
    const sidebar = document.createElement("aside");
    const page = document.createElement("main");
    page.append(portal);
    layout.append(sidebar, page);
    document.body.append(layout);

    const { rerender } = render(<Modal open title="학습 종료" />);
    expect(sidebar).toHaveAttribute("inert");
    rerender(<Modal open={false} title="학습 종료" />);
    expect(sidebar).not.toHaveAttribute("inert");
    layout.remove();
  });

  it("Escape 비활성화와 변경된 onClose 콜백을 존중한다", async () => {
    const user = userEvent.setup();
    const firstClose = vi.fn();
    const latestClose = vi.fn();
    const { rerender } = render(
      <Modal open title="학습 종료" closeOnEscape={false} onClose={firstClose} />
    );
    await user.keyboard("{Escape}");
    expect(firstClose).not.toHaveBeenCalled();
    rerender(<Modal open title="학습 종료" onClose={latestClose} />);
    await user.keyboard("{Escape}");
    expect(latestClose).toHaveBeenCalledOnce();
    expect(firstClose).not.toHaveBeenCalled();
  });
});
