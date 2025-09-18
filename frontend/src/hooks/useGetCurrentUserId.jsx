"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const useGetCurrentUserId = () => {
  const [userId, setUserId] = useState(null);
  const getUserId = () => {
    const getUserId = Cookies.get("mmt_user_id");
    if (getUserId) {
      return getUserId;
    }
    return null;
  };

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      // Assuming user object has a 'name' property
      setUserId(userId);
    }
  }, [userId]);
  return userId;
};
export default useGetCurrentUserId;
