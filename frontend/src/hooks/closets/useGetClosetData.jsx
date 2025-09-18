import { useState } from "react";
import ApiTokenBasedWithoutRedirect from "@/lib/util/ApiTokenBasedWithoutRedirect";

const useGetClosetData = () => {
  const [data, setData] = useState([]);
  const { performGet } = ApiTokenBasedWithoutRedirect();

  const getClosetData = async () => {
    const { response, error } = await performGet("api/v1/closets");
    if (!response) {
    } else if (response.success) {
      setData(response.data);
    }

  };

  return { getClosetData, data };
};

export default useGetClosetData;
