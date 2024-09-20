import { useContext } from "react";
import { NinjaOneContext } from "../state/context.js";

export const useNinjaOneContext = () => {
  const context = useContext(NinjaOneContext);

  if (!context) {
    throw new Error(
      "useNinjaOneContext must be used wthin useNinjaOneProvider"
    );
  }

  return context;
};
