import { useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (bool) => {
    setIsOpen(bool); // Toggle the value by using the opposite
  };

  return { isOpen, toggle };
};

export default useToggle;
