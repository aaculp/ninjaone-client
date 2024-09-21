import { render, screen, fireEvent } from "@testing-library/react";
import DeviceList from "../src/components/DeviceList";
import { useNinjaOneContext } from "@/hooks/useNinjaOneContext";
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useNinjaOneContext");

describe("DeviceList Component", () => {
  const mockDevices = [
    {
      id: 1,
      system_name: "Device 1",
      type: "mac",
      hdd_capacity: 256,
    },
    {
      id: 2,
      system_name: "Device 2",
      type: "windows",
      hdd_capacity: 512,
    },
  ];

  const mockContextValue = {
    devices: mockDevices,
    searchInput: "",
    filters: {},
    setIsModalOpen: jest.fn(),
    isModalOpen: { edit: false, delete: false },
    deleteDevice: jest.fn(),
    editDevice: jest.fn(),
    setDeviceToAdd: jest.fn(),
    deviceToAdd: {},
  };

  beforeEach(() => {
    useNinjaOneContext.mockReturnValue(mockContextValue);
  });

  it("renders a list of devices", () => {
    render(<DeviceList />);

    const device1 = screen.getByText("MAC-DEVICE 1");
    const device2 = screen.getByText("WINDOWS-DEVICE 2");

    expect(device1).toBeInTheDocument();
    expect(device2).toBeInTheDocument();
  });

  it("opens the more options menu when clicking the dots button", async () => {
    render(<DeviceList />);

    const moreOptionsButton = screen.getByAltText(/Edit Delete Option/);
    const editBtn = screen.getByRole("button", { name: /edit/i });
    const deleteBtn = screen.getByRole("button", { name: /delete/i });

    await userEvent.click(moreOptionsButton);
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("opens the edit modal when the edit button is clicked", async () => {
    render(<DeviceList />);

    const moreOptionsButton = screen.getByAltText(/Edit Delete Option/);
    const editBtn = screen.getByRole("button", { name: /edit/i });

    await userEvent.click(moreOptionsButton);
    expect(editBtn).toBeInTheDocument();

    expect(mockContextValue.setIsModalOpen).toHaveBeenCalledWith(
      expect.objectContaining({ edit: true })
    );
  });

  it("opens the delete modal when the delete button is clicked", async () => {
    render(<DeviceList />);

    const moreOptionsButton = screen.getByAltText(/Edit Delete Option/);
    const editBtn = screen.getByRole("button", { name: /edit/i });
    const deleteBtn = screen.getByRole("button", { name: /delete/i });

    await userEvent.click(moreOptionsButton);
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();

    expect(mockContextValue.setIsModalOpen).toHaveBeenCalledWith(
      expect.objectContaining({ delete: true })
    );
  });
});
