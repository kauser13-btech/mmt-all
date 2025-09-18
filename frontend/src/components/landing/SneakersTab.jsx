"use client";
// import useTopSneakersData from "@/app/hooks/sneakers/useTopSneakersData";
import { useState } from "react";
import SneakersTabList from "./SneakersTabList";
import TabComponent from "./TabComponent";
import SectionTitle from "./components/SectionTitle";

import { useSelector } from 'react-redux';

const SneakersTab = () => {
  const [toggleTab, handleTabToggle] = useState(1);
  const tabItemsArray = [
    {
      id: 1,
      title: "Recently Added",
    },
    {
      id: 2,
      title: "Best sellers",
    },
  ];
  // const { recentlyAdded, bestSeller, isLoading } = useTopSneakersData();
  const { recently_added: recentlyAdded, best_sellers: bestSeller, isLoading } = useSelector(state => state.topSneakers);

  return (
    <div className="top-bottom-margin my-container">
      <div className="flex flex-col w-full h-full gap-6 md:gap-4 xl:gap-11">
        <div className="flex flex-col items-center gap-4">
          <SectionTitle title="match these" subtitle="popular sneakers" />
          <TabComponent
            activeTabId={toggleTab}
            setActiveTabId={handleTabToggle}
            tabItemsArray={tabItemsArray}
            tabName="sneakers"
          />
        </div>
        <SneakersTabList
          toggleTab={toggleTab}
          recentlyAdded={recentlyAdded}
          bestSeller={bestSeller}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SneakersTab;
