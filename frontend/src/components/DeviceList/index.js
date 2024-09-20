// Libraries

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

// Dependencies

import MAC from "../../assets/apple-icon.svg";
import LINUX from "../../assets/peguin-icon.svg";
import WINDOWS from "../../assets/windows-icon.svg";
import DEFAULT from "../../assets/close-icon.svg";
import DOTS from "../../assets/dots-icon.svg";
import Input from "../Input";
import Modal from "../Modal";
import { useNinjaOneContext } from "@/hooks/useNinjaOneContext";

// Component

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 48px;
  gap: 20px;

  .header,
  .device-header {
    font-size: 14px;
    line-height: 17px;
  }

  .device-subheader {
    font-size: 16px;
    line-height: 14.5px;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
  }

  > div:first-child > div > img {
    margin-right: 10px;
  }

  > div:last-child {
    position: relative;
  }

  > div:last-child > div {
    background: white;
    border: 1px solid gray;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 50px 10px 10px;
    position: absolute;
    top: 25px;
    left: -90px;
    z-index: 2;
  }
`;

export default function DeviceList() {
  const {
    devices,
    searchInput,
    filters,
    setIsModalOpen,
    isModalOpen,
    deleteDevice,
    editDevice,
    setDeviceToAdd,
    deviceToAdd,
  } = useNinjaOneContext();
  const [openDialogId, setOpenDialogId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState({});
  const [editBtnTouched, setEditBtnTouched] = useState(false);

  const getDeviceImage = (deviceType) => {
    switch (deviceType.toLowerCase()) {
      case "mac":
        return MAC;
      case "linux":
        return LINUX;
      case "windows":
        return WINDOWS;
      default:
        return DEFAULT;
    }
  };

  const filterDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearchInput =
        device.system_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        device.type.toLowerCase().includes(searchInput.toLowerCase());

      const matchesDeviceType =
        !filters.deviceType ||
        filters.deviceType === "" ||
        device.type.toLowerCase() === filters.deviceType;

      const matchesHddCapacity =
        !filters.hddCapacity ||
        filters.hddCapacity === "" ||
        device.hdd_capacity === filters.hddCapacity;

      return matchesSearchInput && matchesDeviceType && matchesHddCapacity;
    });
  }, [devices, searchInput, filters]);

  useEffect(() => {
    setSelectedDialog(devices.find((device) => openDialogId === device.id));
  }, [openDialogId]);

  return (
    <StyledContainer>
      <span className="header">Device</span>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "gray",
          marginLeft: "-20px",
          marginRight: "-20px",
          width: "100%",
        }}
      />
      {devices &&
        filterDevices.map((device) => (
          <StyledContentContainer key={device.id}>
            <div>
              <div style={{ display: "flex" }}>
                <Image
                  src={getDeviceImage(device.type)}
                  width={16}
                  height={16}
                  alt={device.type}
                />
                <span className="device-header">
                  {device.type.toUpperCase()}-{device.system_name.toUpperCase()}
                </span>
              </div>

              <div className="device-subheader">
                <span>
                  {device.type.charAt(0).toUpperCase() +
                    device.type.slice(1).toLowerCase()}{" "}
                  workstation - {device.hdd_capacity}GB
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setShowDialog(!showDialog);
                  setOpenDialogId(device.id);
                }}
              >
                <Image alt="More Options" width={14} height={14} src={DOTS} />
              </button>

              {openDialogId == device.id && showDialog && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      setEditBtnTouched(true);
                      setDeviceToAdd({ ...selectedDialog });
                      setIsModalOpen({
                        ...isModalOpen,
                        edit: true,
                      });
                      setEditBtnTouched(false);
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>Edit</span>
                  </button>
                  <button
                    onClick={() =>
                      setIsModalOpen({
                        ...isModalOpen,
                        delete: true,
                      })
                    }
                  >
                    <span style={{ color: "red", fontSize: "14px" }}>
                      Delete
                    </span>
                  </button>
                </div>
              )}
            </div>
          </StyledContentContainer>
        ))}

      {/* Edit Modal */}
      <Modal
        show={isModalOpen.edit}
        onClose={() =>
          setIsModalOpen({
            ...isModalOpen,
            edit: false,
          })
        }
        header="Edit Device"
        body={<Input type="modal" />}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20 }}>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => {
                setIsModalOpen({
                  ...isModalOpen,
                  edit: false,
                });
                setOpenDialogId(null);
                setShowDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              style={{
                backgroundColor: "#337AB7",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
                marginRight: "10px",
              }}
              onClick={() => {
                editDevice(deviceToAdd);
                setOpenDialogId(null);
                setShowDialog(false);
              }}
            >
              Submit
            </button>
          </div>
        }
      />

      {/* Delete Modal */}
      <Modal
        show={isModalOpen.delete}
        onClose={() =>
          setIsModalOpen({
            ...isModalOpen,
            delete: false,
          })
        }
        header="Delete Device?"
        body={
          <span>
            You are about to delete the device {selectedDialog?.type}-
            {selectedDialog?.system_name}. This action cannot be undone.
          </span>
        }
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20 }}>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => {
                setIsModalOpen({
                  ...isModalOpen,
                  delete: false,
                });
                setOpenDialogId(null);
                setShowDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              style={{
                backgroundColor: "#D53948",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
              }}
              onClick={() => {
                deleteDevice(selectedDialog);
                setOpenDialogId(null);
                setShowDialog(false);
              }}
            >
              Delete
            </button>
          </div>
        }
      />
    </StyledContainer>
  );
}
