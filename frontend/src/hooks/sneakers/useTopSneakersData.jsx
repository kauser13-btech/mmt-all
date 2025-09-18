import ApiCall from "@/lib/util/ApiCall";
import React, { useEffect, useState } from "react";

const useTopSneakersData = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { performGet } = ApiCall();

  const fetchSneaker = async () => {
    const response = await performGet("api/v1/top-sneakers");
    if (response.success) {
      setRecentlyAdded(response.data.recently_added);
      setBestSeller(response.data.best_sellers);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSneaker();
  }, []);

  return { recentlyAdded, bestSeller, isLoading };
};
export default useTopSneakersData;
