import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

jest.mock("next/image", () => {
  return function MockImage({ alt }) {
    return <img alt={alt} />;
  };
});

describe("Header Component", () => {
  test("renders the logo image", () => {
    render(<Header />);

    const logo = screen.getByAltText("Picture of the author");
    expect(logo).toBeInTheDocument();
  });

  test("has the correct styles", () => {
    const { container } = render(<Header />);
    
    expect(container.firstChild).toHaveStyle(`
      background: #002a42;
      padding: 12px 0;
    `);
  });
});
