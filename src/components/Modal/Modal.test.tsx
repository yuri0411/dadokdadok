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
});
