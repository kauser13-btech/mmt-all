import ApiTokenBasedWithoutRedirect from "@/lib/util/ApiTokenBasedWithoutRedirect";
import React from "react";
import { toast } from "react-toastify";

const useDeleteClosetData = () => {
  const { performDelete } = ApiTokenBasedWithoutRedirect();
  const handleDelete = async (id) => {
    const toastId = toast.loading("Please wait...");
    const { response } = await performDelete(`api/v1/closets/${id}`);
    try {
      if (response) {
        toast.update(toastId, {
          render: "Closet item deleted.",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return handleDelete;
};

export default useDeleteClosetData;
