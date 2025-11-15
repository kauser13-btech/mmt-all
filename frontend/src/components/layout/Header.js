"use client";

import { ClosetProvider } from "@/context/ClosetContex";
import { UserNameProvider } from '@/context/UserNameContext';

import { usePathname, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

import NavTop from "@/components/global/NavTop";
import Navbar from "../global/navbar/Navbar";


// import DaisyModal from "../modal/DaisyModal";

// import SearchSection from "../search/SearchSection";

// import { MyCloset } from "./MyCloset";
// import Search from "./Search";
// import User from "./User";
// import AddToCart from "./addtocart/AddToCart";

// import { useUserName } from "@/context/UserNameContext";
// import ApiCall from "@/app/util/ApiCall";
// import { useRouter } from "next-nprogress-bar";
// import useTopSneakersData from "@/app/hooks/sneakers/useTopSneakersData";

// import { useSelector } from 'react-redux';


export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        setOnScroll(true);
      } else {
        setOnScroll(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`z-50 inset-x-0 top-0 ${pathname == "/"
        ? `fixed  ${onScroll && "nav-gradient shadow-lg"}`
        : "nav-gradient sticky"
        }`}
    >

      <NavTop />

      <ClosetProvider>
        <UserNameProvider>
          <Navbar />
        </UserNameProvider>
      </ClosetProvider>


    </header>

  );
}
