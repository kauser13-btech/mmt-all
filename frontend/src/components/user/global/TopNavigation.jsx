"use client";
import useToggle from "@/hooks/useToggle";
import ApiTokenBased from "@/lib/util/ApiTokenBased";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from "react";
import NavDrawerButton from "./SideNavBarDrawerButton/NavDrawerButton";

const TopNavigation = ({ title }) => {
  const [imgloading, setimgLoading] = useState(true);
  const { performGet } = ApiTokenBased();
  const [info, setInfo] = useState({});
  let [newName, setNewName] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const { isOpen, toggle } = useToggle();
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("mmt_user_name");
    Cookies.remove("mmt_user_session");
    Cookies.remove("mmt_user_id");
    Cookies.remove("cart-token");
    router.push("/sign-in");
  };

  const fetchDataFromApi = async () => {
    const { response, error } = await performGet("api/v1/profile");
    if (response) {
      setInfo(response.data);
      setNewName(response.data.name);
      if (response.data.image_url === "") {
        setSelectedImage("/images/user/user.svg");
      } else {
        setSelectedImage(response.data.image_url);
      }
    } else {
      console.log(response);
    }
  };


  useEffect(() => {
    fetchDataFromApi();
  }, []);
  return (
    <div className="bg-white ">
      <div className="h-20 px-7 lg:px-10 flex items-center justify-between ">
        <div className="flex space-x-[20px]">
          <NavDrawerButton />
          <h3 className="w-[70px] sm:w-full text-[#5E5D72] font-roboto text-1rem font-semibold">{title}</h3>
        </div>
        <div className="space-x-[30px] flex justify-between items-center ">
          {/* <Link href="" className="">
            <p className="hidden lg:flex w-auto truncate py-2.5 px-[25px] text-white designYourOwnBackground justify-center items-center">Design your own outfit</p>
          </Link>
          <div className="{styles.cart}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_4724_2785)">
                <path
                  d="M8.25065 20.1668C8.75691 20.1668 9.16732 19.7564 9.16732 19.2502C9.16732 18.7439 8.75691 18.3335 8.25065 18.3335C7.74439 18.3335 7.33398 18.7439 7.33398 19.2502C7.33398 19.7564 7.74439 20.1668 8.25065 20.1668Z"
                  stroke="#05A5AC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3327 20.1668C18.8389 20.1668 19.2493 19.7564 19.2493 19.2502C19.2493 18.7439 18.8389 18.3335 18.3327 18.3335C17.8264 18.3335 17.416 18.7439 17.416 19.2502C17.416 19.7564 17.8264 20.1668 18.3327 20.1668Z"
                  stroke="#05A5AC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0.916016 0.916504H4.58268L7.03935 13.1907C7.12317 13.6127 7.35276 13.9918 7.68793 14.2616C8.0231 14.5314 8.44249 14.6747 8.87268 14.6665H17.7827C18.2129 14.6747 18.6323 14.5314 18.9674 14.2616C19.3026 13.9918 19.5322 13.6127 19.616 13.1907L21.0827 5.49984H5.49935"
                  stroke="#05A5AC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4724_2785">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div> */}
          <div className="dropdown dropdown-end">
            <div className="flex relative">
              {/* <img className="rounded-full lg:rounded-none h-[30px] w-[30px]" src="/images/avatar.webp" alt="" /> */}
              {/* <img className="rounded-full h-[30px] w-[30px]" src={selectedImage} alt="" /> */}
              <div tabIndex={0} role="button" className=""><img className="rounded-full h-[40px] w-[40px]" src={selectedImage} alt="" /></div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
              {/* <li className="block rounded-lg"><div className=" w-full ">Design Your Outfit</div></li>
              <li className="block rounded-lg"><div className="w-full">Cart</div></li> */}
              <li className="rounded-lg"><div onClick={handleLogout} className=" w-full">Sign Out</div></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
