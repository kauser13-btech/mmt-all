import React from "react";
import Style from "../../styles/landing/searchingSneakers.module.scss";
const SearchingSneakers = () => {
  return (
    <section className={Style.searchingSneakers}>
      <div className={Style.searchingSneakersDiv}>
        <h1>Start By Searching Your Sneakers </h1>
        <div className={Style.buttonGroup}>
          <button>
            <input type="text" placeholder="Search sneaker to match" />
          </button>
          <div className={Style.searchBox} hidden>
            <div className={Style.searchDev}>
              <p className={Style.searchDivP}>
                Nike Air Force 1 Low Four Horsemen
              </p>
              <div className={Style.searchDivImg}>imgsss</div>
            </div>
            <div className={Style.searchDev}>
              <p className={Style.searchDivP}>
                Nike Air Max 1 Shima Shima Sail
              </p>
              <div className={Style.searchDivImg}>imgsss</div>
            </div>
          </div>
        </div>
        <p className={Style.searchingSneakersDivBottom}>
          With a database of thousands of sneakers to match including Vans,
          Adidas, Nike, Jordan's and many other brands, Match My Tee is your
          #1-Source for the highest quality unique apparel to match your
          sneakers.
        </p>
      </div>
    </section>
  );
};

export default SearchingSneakers;
