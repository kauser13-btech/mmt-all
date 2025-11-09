"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import BurgerIcon from "@/components/svg/BurgerIcon";
import MmtLogo from "@/components/svg/MmtLogo";

import { Search, UserRound, ShoppingCart, LogOut } from "lucide-react";
import AuthAPI from "@/lib/util/AuthAPI";
import { useRouter } from "next/navigation";

// import { useCloset } from "@/context/ClosetContex";
// import TailwindDrawer from "@/components/global/drawerMenu/TailwindDrawer";

const Navbar = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const user = AuthAPI.getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await AuthAPI.logout();
    setCurrentUser(null);
    setShowUserMenu(false);
    router.push("/");
  };

  // const { isClosetOpen, toggleCloset } = useCloset();
  // const { data } = useCloset();

  const urls = [
    {
      id: 1,
      name: "T-Shirts",
      url: "/collection/?product_type=T-shirt"
    },
    {
      id: 2,
      name: "Hoodies",
      url: "/collection/?product_type=Hoodie"
    },
  ];

  return (
    <div className="my-container py-[17.5px] md:py-[26px]  xl:py-[27.4534px]">
      <div className="flex items-center w-full justify-between md:hidden">
        <BurgerIcon
          setClosetOpen={() => toggleCloset(!isClosetOpen)}
          urls={urls}
        />
        <Link href="/">
          <MmtLogo color="black" />
        </Link>
        <div className="flex items-center gap-4">
          {/* TODO : Search */}
          {/* <Search onClick={() => setSearchDrawer(true)} /> */}

          {/* TODO : AddToCart */}
          {/* <AddToCart drawerId="mobile-cart-drawer" /> */}
        </div>
      </div>
      <nav className="max-md:hidden flex items-center justify-between">
        <Link href="/">
          <MmtLogo color="black" />
        </Link>

        <ul className="flex gap-[22px] text-sm text-black xl:gap-[75px] xl:font-medium xl:text-base md:w-[45%] lg:w-[35%] xl:w-[45%]">
          {urls.map((url) => (
            <li
              key={url.id}
              className="cursor-pointer hover:underline hover:scale-[1.05] duration-200"
            >
              <Link href={url.url}>{url.name}</Link>
            </li>
          ))}
          <li
            key={'how-it-works'}
            className="cursor-pointer hover:underline hover:scale-[1.05] duration-200"
          >
            <Link href={'/how-it-works'}>How It Works</Link>
          </li>
          <li
            key={'closet'}
            className="cursor-pointer hover:underline hover:scale-[1.05] duration-200"
            onClick={() => toggleCloset(true)}
          >
            My Closet
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <Search size={28} className="cursor-pointer hover:scale-110 duration-200" />

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-200"
            >
              <UserRound size={28} />
              {currentUser && (
                <span className="text-sm font-medium max-w-[100px] truncate hidden lg:block">
                  {currentUser.name}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {currentUser.name}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <ShoppingCart size={28} className="cursor-pointer hover:scale-110 duration-200" />
        </div>
      </nav>
      {/* <MyCloset isClosetOpen={isClosetOpen} setIsOpen={toggleCloset} /> */}


      {/* <TailwindDrawer
          width="w-full"
          isOpen={searchDrawer}
          setIsOpen={setSearchDrawer}
          title={<MmtLogo color="black" />}
          position="right"
          scroll={"h-[calc(100vh-12vh)] overflow-y-scroll"}
          background="bg-white"
        >
          <SearchSection />
        </TailwindDrawer> */}
    </div>
  );
};

export default Navbar;
