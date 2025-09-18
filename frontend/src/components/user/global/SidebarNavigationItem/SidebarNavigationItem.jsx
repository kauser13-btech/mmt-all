"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useRouter } from 'next-nprogress-bar';
import { toast } from "react-toastify";

const SidebarNavigationItem = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to log out?");
  
    if (confirmed) {
      Cookies.remove("mmt_user_name");
      Cookies.remove("mmt_user_session");
      Cookies.remove("mmt_user_id");
      Cookies.remove("cart-token");
      toast.success("You have successfully logged out!", {
        position: "top-right"
      });
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    } else {
      toast.info("Logout cancelled.", {
        position: "top-right"
      });
    }
  };
  const LinkLists = [
    {
      id: 1,
      image: "/images/user/dashboard.svg",
      title: "Dashboard",
      url: "/user/dashboard/",
    },
    {
      id: 2,
      image: "/images/user/order_history.svg",
      title: "Order History",
      url: "/user/orderhistory/",
    },
    {
      id: 3,
      image: "/images/user/personal_information.svg",
      title: "Personal information",
      url: "/user/personal_information/",
    },
    // {
    //   id: 4,
    //   image: "/images/user/address.svg",
    //   title: "Address",
    //   url: "/user/address/",
    // },
    // {
    //   id: 5,
    //   image: "/images/user/personal_information.svg",
    //   title: "Store link",
    //   url: "/",
    // },
    // {
    //   id: 6,
    //   image: "/images/user/wishlist.svg",
    //   title: "Wishlist",
    //   url: "/user/wishlist/",
    // },
    // {
    //   id: 7,
    //   image: "/images/user/request.svg",
    //   title: "Request",
    //   url: "#",
    // },
  ];

  return (
    <div>
      {LinkLists.map((link) => (
        <Link
          href={link.url}
          key={link.id}
          className={pathname == link.url ? "flex items-center mb-[30px] sideimg" : "flex items-center mb-[30px] "}
        >
          <img src={link.image} alt={link.title} />
          <p className="text-[#838697] hover:text-white ml-[13px]">{link.title}</p>
        </Link>
      ))}
      <button onClick={handleLogout}  className="flex items-center mb-[30px]">
        <img className="w-6 h-6" src="/images/user/logout.svg" alt="Logout" />
        <div className="text-[#838697] hover:text-white ml-[13px]">Log Out</div>
      </button>
    </div>
  );
};

export default SidebarNavigationItem;
