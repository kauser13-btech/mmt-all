"use client";

import { useEffect, useState } from "react";

export default function TailwindDrawer({
  children,
  isOpen,
  setIsOpen,
  title,
  scroll,
  width = "w-[35rem] max-sm:w-full",
  position = "left",
  background = "bg-white",
  hideDrawerStyle = '',
}) {
  const [domLoaded, setDomLoaded] = useState(false);

  const drawerPosition = {
    left: "left-0",
    right: "right-0",
  };
  const drawerSlideTop = {
    left: { open: "-translate-x-0", close: "-translate-x-full" },
    right: { open: "translate-x-0", close: "translate-x-full" },
  };
  const drawerContent = {
    left: { open: "-translate-x-0", close: "-translate-x-full" },
    right: { open: "-translate-x-0", close: "translate-x-full" },
  };
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      setDomLoaded(true);
    }, 700);
  }, []);

  if (!domLoaded) return null;

  return (
    <main
      className={`fixed overflow-hidden z-[99999] bg-gray-900 bg-opacity-50 inset-0 transform ease-in-out delay-100 ${hideDrawerStyle}
    ${isOpen
          ? `opacity-100 ${drawerSlideTop[position].open}`
          : `opacity-0 ${drawerSlideTop[position].close}`
        }
     `}
    >
      <section
        className={`${width} absolute h-svh shadow-xl duration-300 transform z-[60] 
      ${drawerPosition[position]}
      ${isOpen
            ? `${drawerContent[position].open}`
            : `${drawerContent[position].close}`
          }
      `}
      >
        <div className={`${background} h-svh overflow-hidden`}>
          <div
            className={`flex items-center justify-between px-4 pt-4 ${title != "" ? "" : ""
              }`}
          >
            <div></div>
            <h3>{title}</h3>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <article className={`relative md-max:w-full md-min:w-[21.875rem] flex flex-col ${scroll ? scroll : "h-full"}`}>
            {children}
          </article>
        </div>
      </section>
      <section
        onClick={() => {
          setIsOpen(false);
        }}
        className="w-screen h-screen !overflow-hidden cursor-pointer "
      ></section>
    </main>
  );
}
