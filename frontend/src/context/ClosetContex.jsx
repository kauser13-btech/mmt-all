"use client";

import { createContext, useContext, useState } from "react";
import useGetClosetData from "@/hooks/closets/useGetClosetData";

const ClosetContext = createContext();

export const ClosetProvider = ({ children }) => {
  const [isClosetOpen, setIsClosetOpen] = useState(false);

  const getClosetData = useGetClosetData();
  // Function to toggle the Closet state
  const toggleCloset = (bool) => {
    setIsClosetOpen(bool);
  };

  // Value object to be provided to the context consumers
  const contextValue = {
    isClosetOpen,
    toggleCloset,
  };

  return (
    <ClosetContext.Provider value={{ ...contextValue, ...getClosetData }}>
      {children}
    </ClosetContext.Provider>
  );
};

// Custom hook to consume the context
export const useCloset = () => {
  const context = useContext(ClosetContext);

  if (!context) {
    throw new Error("useCloset must be used within a ClosetProvider");
  }

  return context;
};
