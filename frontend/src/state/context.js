import React, { createContext, useEffect, useState } from "react";

const defaultContext = {
  devices: [],
  setDevices: () => {},
  searchInput: "",
  setSearchInput: () => {},
  deviceTypeFilter: [],
  setDeviceTypeFilter: () => {},
  hddCapacityFilter: [],
  setHddCapacityFilter: () => {},
  filters: {
    deviceType: "",
    hddCapacity: "",
  },
  setFilters: () => {},
  isModalOpen: {
    add: false,
    delete: false,
    edit: false,
  },
  setIsModalOpen: () => {},
  deviceToAdd: {
    system_name: "",
    type: "",
    hdd_capacity: "",
  },
  setDeviceToAdd: () => {},
  editDevice: () => {},
  deleteDevice: () => {},
  resetFilters: () => {},
  addDevice: () => {},
};

export const NinjaOneContext = createContext(defaultContext);

export const NinajaOneProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [deviceTypeFilter, setDeviceTypeFilter] = useState([]);
  const [hddCapacityFilter, setHddCapacityFilter] = useState([]);
  const [filters, setFilters] = useState({
    deviceType: "",
    hddCapacity: "",
  });
  const [deviceToAdd, setDeviceToAdd] = useState({
    system_name: "",
    type: "",
    hdd_capacity: "",
    id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState({
    add: false,
    delete: false,
    edit: false,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/devices`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setDevices(data);

      const deviceTypes = data.map((device) => device.type);
      setDeviceTypeFilter([...new Set(deviceTypes)]);

      const hddCapacity = data
        .map((device) => device.hdd_capacity)
        .sort((a, b) => b - a);
      setHddCapacityFilter([...new Set(hddCapacity)]);
    } catch (error) {
      console.error(`Error fetching devices: ${error}`);
    }
  };

  const editDevice = async (deviceData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/devices/${deviceData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: deviceData.type.toUpperCase(),
            system_name: deviceData.system_name.toUpperCase(),
            hdd_capacity: deviceData.hdd_capacity,
            id: deviceData.id,
          }),
        }
      );

      if (!response.ok) {
        setIsModalOpen({
          ...isModalOpen,
          edit: false,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsModalOpen({
        ...isModalOpen,
        edit: false,
      });
      setDeviceToAdd({
        type: "",
        system_name: "",
        hdd_capacity: "",
      });
      await fetchData();
      return data;
    } catch (error) {
      setIsModalOpen({
        ...isModalOpen,
        edit: false,
      });
      console.error(`Error posting in editDevices: ${error}`);
    }
  };

  const deleteDevice = async (deviceData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/devices/${deviceData.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: deviceData.type.toUpperCase(),
            system_name: deviceData.system_name.toUpperCase(),
            hdd_capacity: deviceData.hdd_capacity,
            id: deviceData.id,
          }),
        }
      );

      if (!response.ok) {
        setIsModalOpen({
          ...isModalOpen,
          delete: false,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsModalOpen({
        ...isModalOpen,
        delete: false,
      });
      await fetchData();
      return data;
    } catch (error) {
      setIsModalOpen({
        ...isModalOpen,
        delete: false,
      });
      console.error(`Error posting in deleteDevice: ${error}`);
    }
  };

  const addDevice = async () => {
    try {
      const response = await fetch(`http://localhost:8080/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: deviceToAdd.type.toUpperCase(),
          system_name: deviceToAdd.system_name.toUpperCase(),
          hdd_capacity: deviceToAdd.hdd_capacity,
          id: Math.floor(Math.random() * 100),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDeviceToAdd({
        type: "",
        system_name: "",
        hdd_capacity: "",
      });
      setIsModalOpen({
        ...isModalOpen,
        add: false,
      });
      await fetchData();
      return data;
    } catch (error) {
      console.error(`Error posting in addDevice: ${error}`);
    }
  };

  const resetFilters = () => {
    setFilters({
      deviceType: "",
      hddCapacity: "",
    });
    setSearchInput("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NinjaOneContext.Provider
      value={{
        devices,
        setDevices,
        searchInput,
        setSearchInput,
        deviceTypeFilter,
        setDeviceTypeFilter,
        hddCapacityFilter,
        setHddCapacityFilter,
        filters,
        setFilters,
        isModalOpen,
        setIsModalOpen,
        deviceToAdd,
        setDeviceToAdd,
        addDevice,
        editDevice,
        deleteDevice,
        resetFilters,
      }}
    >
      {children}
    </NinjaOneContext.Provider>
  );
};

// const resetFilters = async () => {
//   try {
//     const response = await fetch(`http://localhost:8080/devices`, {
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     setDevices(data);
//     setFilters({
//       deviceType: "",
//       hddCapacity: "",
//     });
//     setSearchInput("");
//   } catch (error) {
//     console.error(`Error fetching vendors: ${error}`);
//   }
// };
