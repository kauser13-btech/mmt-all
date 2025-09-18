import { useEffect, useState } from "react";

const TabComponent = ({
  tabName,
  activeTabId,
  setActiveTabId,
  tabItemsArray,
}) => {
  const [activeTabProperty, setActiveTabProperty] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", getActiveTabProperty);
    return () => {
      window.removeEventListener("resize", getActiveTabProperty);
    };
  }, []);

  useEffect(() => {
    getActiveTabProperty();
  }, [activeTabId]);


  const getActiveTabProperty = () => {
    const activeTab = document.getElementById(`${tabName + activeTabId}`);
    if (activeTab) {
      const activeTabWidth = activeTab.offsetWidth;
      const activeTabPosition = activeTab.offsetLeft;
      setActiveTabProperty({ activeTabWidth, activeTabPosition });
      setActiveTabId(activeTabId);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDomLoaded(true);
    }, 3000);
  }, []);

  return (
    <div className="border-b-2 border-[#D9D9D9] w-full mt-4">
      <div
        className="flex justify-center gap-[50px] md:gap-[114px] xl:gap-[230px] relative font-staatliches text-title-work-card
      leading-[0.022px] cursor-pointer text-[22px] md:tracking-[0.36px] xl:text-2xl xl:leading-6 xl:tracking-[0.038px]"
      >
        {tabItemsArray.map((item, index) => (
          <div
            key={index}
            className="px-1 sm:px-5 py-4"
            id={`${tabName + item.id}`}
            onClick={() => setActiveTabId(item.id)}
          >
            {item.title}
          </div>
        ))}

        {domLoaded && <div
          className="absolute -bottom-[3px] border-b-4 border-black transition-all duration-300 ease-in-out"
          style={
            {
              width: activeTabProperty.activeTabWidth,
              left: activeTabProperty.activeTabPosition,
            }
          }
        />}
      </div>
    </div>
  );
};

export default TabComponent;
