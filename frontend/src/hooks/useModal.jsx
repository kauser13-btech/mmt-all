"use client";
import React, { useState, useEffect } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Cleanup function to reset the style when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const modalHandle = () => {
    setIsOpen(!isOpen);
  };

  return { modalHandle, isOpen };
};

export default useModal;
