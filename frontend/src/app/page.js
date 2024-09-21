"use client";

// Libraries

import Image from "next/image";
import styled from "styled-components";

// Dependencies

import AddDevice from "../assets/add-icon.svg";
import ReloadDevices from "../assets/reload-icon.svg";
import DeviceList from "../components/DeviceList";
import Header from "../components/Header";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useNinjaOneContext } from "@/hooks/useNinjaOneContext";

// Component

const StyledDevicesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 0;
  margin: auto;
  width: calc(100% - 48px);

  > span {
    font-size: 20px;
    line-height: 24.2px;
  }

  > button {
    background: #337ab7;
    color: white;
    display: flex;
    gap: 8px;
    font-size: 14px;
    line-height: 14px;
    padding: 12px;
    border-radius: 4px;
  }
`;

const StyledFilterContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  padding: 24px 0;
  margin: auto;
  width: calc(100% - 48px);

  > div {
    display: flex;
    gap: 10px;
  }
`;

export default function App() {
  const {
    resetFilters,
    isModalOpen,
    setIsModalOpen,
    setDeviceToAdd,
    addDevice,
  } = useNinjaOneContext();

  return (
    <>
      <Header />

      <StyledDevicesContainer>
        <span>Devices</span>
        <button
          onClick={() => {
            setDeviceToAdd({
              type: "",
              system_name: "",
              hdd_capacity: "",
              id: "",
            });
            setIsModalOpen({
              ...isModalOpen,
              add: true,
            });
          }}
        >
          <Image
            alt="Add Device"
            src={AddDevice}
            width={14}
            height={14}
            priority
          />
          Add Devices
        </button>
      </StyledDevicesContainer>

      <StyledFilterContainer>
        <div>
          <Input type="search" />
          <Input type="select" sortingType="device_type" />
          <Input type="select" sortingType="hdd_capacity" />
        </div>
        <button onClick={resetFilters}>
          <Image
            alt="Reload Devices"
            src={ReloadDevices}
            width={14}
            height={14}
            priority
          />
        </button>
      </StyledFilterContainer>

      <DeviceList />

      <Modal
        show={isModalOpen.add}
        onClose={() =>
          setIsModalOpen({
            ...isModalOpen,
            add: false,
          })
        }
        header="Add Device"
        body={<Input type="modal" />}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 20 }}>
            <button
              onClick={() =>
                setIsModalOpen({
                  ...isModalOpen,
                  add: false,
                })
              }
              style={{ color: "#337AB7", marginRight: "10px" }}
            >
              Cancel
            </button>
            <button
              style={{
                backgroundColor: "#337AB7",
                color: "white",
                padding: "10px",
                borderRadius: "4px",
              }}
              onClick={() => addDevice()}
            >
              Submit
            </button>
          </div>
        }
      />
    </>
  );
}
