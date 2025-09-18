"use client";
import { useState } from "react";
import FeaturedProductTabList from "./FeaturedProductTabList";
import TabComponent from "./TabComponent";

function FeaturedProductTab() {
  const [toggleTab, handleTabToggle] = useState(1);
  const tabItemsArray = [
    {
      id: 1,
      title: "Just Dropped",
    },
    {
      id: 2,
      title: "Classic",
    },
  ];
  return (
    <div className="top-bottom-margin my-container">
       <div className="flex flex-col w-full h-full gap-6 md:gap-4 xl:gap-11">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-8">
          <h2 className="font-staatliches text-3xl text-title-work-card md:tracking-[0.52px] md:leading-[30px]
               lg:text-[45px] lg:tracking-[0.072px]"
              >Featured products</h2>
            <p className="text-center text-sub-work-card font-roboto text-xl w-full leading-6 md:font-medium lg:text-2xl">
            A good rule of thumb when matching clothes <br className="hidden md:block" />is to choose a base color and build your outfit around it.
            </p>
          </div>
          <TabComponent
            activeTabId={toggleTab}
            setActiveTabId={handleTabToggle}
            tabItemsArray={tabItemsArray}
            tabName="featured"
          />
        </div>
        <FeaturedProductTabList toggleTab={toggleTab} />
      </div>
    </div>

  );
}

export default FeaturedProductTab;
