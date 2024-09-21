import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../src/components/Input";
import { useNinjaOneContext } from "../src/hooks/useNinjaOneContext";

jest.mock("../src/hooks/useNinjaOneContext");

const mockContext = {
  deviceTypeFilter: ["Desktop", "Laptop"],
  hddCapacityFilter: ["500", "1000"],
  searchInput: "",
  setSearchInput: jest.fn(),
  filters: { deviceType: "", hddCapacity: "" },
  setFilters: jest.fn(),
  deviceToAdd: { system_name: "", type: "", hdd_capacity: "" },
  setDeviceToAdd: jest.fn(),
};

beforeEach(() => {
  useNinjaOneContext.mockReturnValue(mockContext);
});

describe("Input component", () => {
  test("renders search input and handles input change", () => {
    render(<Input type="search" />);

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(mockContext.setSearchInput).toHaveBeenCalledWith("test search");
  });

  test("renders modal with system name input and device type select", () => {
    render(<Input type="modal" />);

    const systemNameInput = screen.getByPlaceholderText("System Name*");
    expect(systemNameInput).toBeInTheDocument();

    fireEvent.change(systemNameInput, { target: { value: "MY PC" } });
    expect(mockContext.setDeviceToAdd).toHaveBeenCalledWith({
      ...mockContext.deviceToAdd,
      system_name: "MY PC",
    });
  });
});
