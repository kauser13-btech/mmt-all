// CartContext.js
"use client";
import React, { createContext, useContext, useState } from "react";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

const UserNameContext = createContext();

const UserNameProvider = ({ children }) => {
  const [user, setUser] = useState(useGetCurrentUser());

  const updateUser = () => {
    const updatedUser = useGetCurrentUser();
    setUser(updatedUser);
  };

  return (
    <UserNameContext.Provider value={{ getUser: user, updateUser }}>
      {children}
    </UserNameContext.Provider>
  );
};

const useUserName = () => {
  const context = useContext(UserNameContext);
  if (!context) {
    throw new Error("useUserName must be used within a UserNameProvider");
  }
  return context;
};

export { UserNameProvider, useUserName };
