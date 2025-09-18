"use client";
import Link from "next/link";
import SidebarNavigationItem from "./SidebarNavigationItem/SidebarNavigationItem";

const openDrawer = () => {
  const drawer = document.getElementById("my-drawer");
  if (drawer) {
    drawer.click();
  }
};
const SidebarNavigation = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <div className=" sidebar-background h-screen overflow-y-auto hideScroll w-[280.215px]">
          <div className="mx-auto py-[25px]">
            <div className="flex justify-center border-b border-dotted border-[#5e5d72] pt-[10px] pb-[30px] w-full ml-[-15px]">
              <Link className="" href="/">
                <img
                  src="/images/landing/logoWhite.svg"
                  width={199}
                  height={22}
                  alt="matchmytees.com"
                />
              </Link>
               
            </div>
          </div>
          <div className="pt-[25px] px-[47px]">
            <SidebarNavigationItem />
          </div>
        </div>
      </div>

      <div className="drawer z-10 lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="lg:hidden">
            <div className="sidebar-background h-[100vh] w-screen xs:w-[50vw] min-w-[320px]">
              <div className="py-[25px] ">
                <div className="justify-between flex px-[20px]">
                <Link className="" href="/">
                    <img
                      src="/images/landing/logoWhite.svg"
                      width={199}
                      height={22}
                      alt="matchmytees.com1"
                    />
                  </Link>
                  <div className="">
                    <button htmlFor="my-drawer" onClick={openDrawer}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6 fill-white stroke-white ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="absolute left-0 top-[70px] w-[248px] h-[1px] border-t border-dotted border-[#5e5d72]"></div>
              </div>
              <div className="pt-[45px] px-[35px] justify-center">
                <SidebarNavigationItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarNavigation;
