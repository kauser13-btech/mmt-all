"use client";
import ApiCall from "@/lib/util/ApiCall";
import { useEffect, useState } from "react";
import OutfitCategoryTabList from "./OutfitCategoryTabList";
import TabComponent from "./TabComponent";
import SectionTitle from "./components/SectionTitle";

function OutfitCategoryTab() {
  const [toggleTab, handleTabToggle] = useState(1);

  const [dataTShirt, setDataTShirt] = useState([]);
  const [dataHoodies, setDataHoodies] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  // Fetch data when the component mounts
  const [imageLoaded, setImageLoaded] = useState(Array(12).fill(false));
  const [displayedItems, setDisplayedItems] = useState(12);

  const handleImageLoaded = (index) => {
    setImageLoaded((prevImageLoaded) => {
      const newImageLoaded = [...prevImageLoaded];
      newImageLoaded[index] = true;
      return newImageLoaded;
    });
  };
  const { performGet } = ApiCall();

  const fetchData = async () => {
    setIsLoading(true);
    const response = await performGet(`api/v1/get-chosen-products`);
    if (response.success && response.data.length > 0) {
      setDataTShirt(response.data[0]["T-shirt"] ?? []);
      setDataHoodies(response.data[1]["Hoodie"] ?? []);
      setIsLoading(false);
    } else {
      console.log("error fetching t-shirt");
      setDataTShirt([]);
      setDataHoodies([]);
    }
  };

  const tabItemsArray = [
    {
      id: 1,
      title: "T-Shirt",
    },

    {
      id: 2,
      title: "Hoodies",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="top-bottom-margin my-container">
      <div className="flex flex-col w-full h-full gap-6 md:gap-4 xl:gap-[75px]">
        <div className="flex flex-col items-center gap-4">
          <SectionTitle title="Choose by" subtitle="Outfit Category & design" />
          <TabComponent
            activeTabId={toggleTab}
            setActiveTabId={handleTabToggle}
            tabItemsArray={tabItemsArray}
            tabName="outfits"
          />
        </div>
        <OutfitCategoryTabList
          toggleTab={toggleTab}
          dataTShirt={dataTShirt}
          dataHoodies={dataHoodies}
          imageLoaded={imageLoaded}
          isLoading={isLoading}
          handleImageLoaded={handleImageLoaded}
        />
      </div>
    </div>
  );
}

export default OutfitCategoryTab;
