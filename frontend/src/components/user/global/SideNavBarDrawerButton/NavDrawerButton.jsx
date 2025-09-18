import React from "react";
const openDrawer = () => {
  const drawer = document.getElementById("my-drawer");
  if (drawer) {
    drawer.click();
  }
  // <div className="drawer" id="main-nav-drawer"> should be hidden and block every other time
};
const NavDrawerButton = () => {
  return (
    <div className="flex lg:hidden">
      <button htmlFor="my-drawer" onClick={openDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default NavDrawerButton;
