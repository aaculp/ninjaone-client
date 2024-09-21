import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../src/components/Modal";

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  test("renders modal when show is true", () => {
    render(
      <Modal
        show={true}
        onClose={mockOnClose}
        header="Test Header"
        body="Test Body"
        footer={<button>Footer Button</button>}
      />
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
    expect(screen.getByText("Footer Button")).toBeInTheDocument();
  });

  test("does not render modal when show is false", () => {
    render(
      <Modal
        show={false}
        onClose={mockOnClose}
        header="Test Header"
        body="Test Body"
        footer={<button>Footer Button</button>}
      />
    );

    expect(screen.queryByText("Test Header")).not.toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    render(
      <Modal
        show={true}
        onClose={mockOnClose}
        header="Test Header"
        body="Test Body"
        footer={<button>Footer Button</button>}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /×/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking outside the modal", () => {
    render(
      <Modal
        show={true}
        onClose={mockOnClose}
        header="Test Header"
        body="Test Body"
        footer={<button>Footer Button</button>}
      />
    );

    fireEvent.click(screen.getByTestId("modal-backdrop"));

    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });
});
