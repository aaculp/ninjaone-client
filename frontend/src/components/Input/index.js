// Libraries

import Image from "next/image";
import styled from "styled-components";

// Dependencies

import SearchIcon from "../../assets/search-icon.svg";
import { useNinjaOneContext } from "../../hooks/useNinjaOneContext.js";

// Component

const InputWrapper = styled.div`
  ${({ $modal }) => `
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: 100%;
    max-width: ${$modal ? 'unset' : 'max-content'};
  `}
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  background: transparent;
`;

const Input = ({ type, sortingType }) => {
  const {
    deviceTypeFilter,
    hddCapacityFilter,
    searchInput,
    setSearchInput,
    filters,
    setFilters,
    deviceToAdd,
    setDeviceToAdd,
  } = useNinjaOneContext();

  const handleFilterUpdate = (e) => {
    const { id, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  return (
    <>
      {type === "search" && (
        <InputWrapper>
          <IconWrapper>
            <Image alt="Add Device" src={SearchIcon} width={14} height={14} />
          </IconWrapper>
          <InputContainer
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputWrapper>
      )}

      {type === "select" && sortingType === "device_type" && (
        <InputWrapper>
          <select
            style={{ background: "transparent" }}
            id="deviceType"
            value={filters.deviceType}
            onChange={handleFilterUpdate}
          >
            <option value="">Device Type: All</option>
            {deviceTypeFilter &&
              deviceTypeFilter.map((filter, index) => (
                <option key={index} value={filter.toLowerCase()}>
                  {filter}
                </option>
              ))}
          </select>
        </InputWrapper>
      )}

      {type === "select" && sortingType === "hdd_capacity" && (
        <InputWrapper>
          <select
            style={{ background: "transparent" }}
            id="hddCapacity"
            value={filters.hddCapacity}
            onChange={handleFilterUpdate}
          >
            <option value="">Sort By: HDD Capcity (Descending)</option>
            {hddCapacityFilter &&
              hddCapacityFilter.map((filter, index) => (
                <option key={index} value={filter.toLowerCase()}>
                  {filter}GB
                </option>
              ))}
          </select>
        </InputWrapper>
      )}

      {type === "modal" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <InputWrapper $modal>
            <InputContainer
              type="text"
              placeholder="System Name*"
              value={deviceToAdd.system_name}
              onChange={(e) =>
                setDeviceToAdd({
                  ...deviceToAdd,
                  system_name: e.target.value.toUpperCase(),
                })
              }
            />
          </InputWrapper>

          <InputWrapper $modal>
            <select
              style={{ background: "transparent" }}
              id="deviceType"
              value={deviceToAdd.type}
              onChange={(e) =>
                setDeviceToAdd({
                  ...deviceToAdd,
                  type: e.target.value,
                })
              }
            >
              <option value="">Device Type: All</option>
              {deviceTypeFilter &&
                deviceTypeFilter.map((filter, index) => (
                  <option key={index} value={filter.toUpperCase()}>
                    {filter}
                  </option>
                ))}
            </select>
          </InputWrapper>

          <InputWrapper $modal>
            <InputContainer
              type="text"
              placeholder="HDD Capacity (GB)*"
              value={deviceToAdd.hdd_capacity}
              onChange={(e) =>
                setDeviceToAdd({
                  ...deviceToAdd,
                  hdd_capacity: e.target.value,
                })
              }
            />
          </InputWrapper>
        </div>
      )}
    </>
  );
};

export default Input;
