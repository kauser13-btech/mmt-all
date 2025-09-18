import React, { useState } from "react";

const useToggleTab = (initialTab) => {
  const [toggleTab, setToggleTab] = useState(initialTab);

  const handleTabToggle = (type) => {
    setToggleTab(type);
  };
  return [toggleTab, handleTabToggle];
};

export default useToggleTab;
