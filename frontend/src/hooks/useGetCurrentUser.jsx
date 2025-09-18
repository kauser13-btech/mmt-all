"use client";
import Cookies from "js-cookie";

const useGetCurrentUser = () => {
  const user = Cookies.get("mmt_user_name");
  return user || null;
};

export default useGetCurrentUser;
