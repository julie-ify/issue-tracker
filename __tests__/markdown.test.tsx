import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MarkdownTextArea from "@/app/components/MarkdownTextArea";

// @ts-ignore
Document.prototype.createRange = function () {
  return {
    setEnd: function () {},
    setStart: function () {},
    getBoundingClientRect: function () {
      return { right: 0 };
    },
    getClientRects: function () {
      return {
        length: 0,
        left: 0,
        right: 0,
      };
    },
  };
};

describe("Renders", () => {
  it("succesfully", async () => {
    act(() => {
      render(<MarkdownTextArea />);
    });
    const editor = await screen.findByRole("textbox");
		expect(editor).toBeInTheDocument()

    userEvent.type(editor, "hello");
    expect(screen.queryByText("hello")).toBeDefined();
  });
});