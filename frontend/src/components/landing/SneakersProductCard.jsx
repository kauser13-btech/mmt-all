import { Fragment, useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

const SneakersProductCard = ({ data, isLoading, sneakerToCollectionPage }) => {
  const [slicedData, setSlicedData] = useState([]);
  const [numsOfLoad, setNumsOfLoad] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let numToShow = 10;

      if (windowWidth >= 1024 && windowWidth < 1600) {
        numToShow = 8;
      } else if (windowWidth >= 768 && windowWidth < 1024) {
        numToShow = 9;
      }

      setSlicedData(data.slice(0, numToShow));
      setNumsOfLoad(numToShow);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-y-14 xl:gap-x-6 2xl:grid-cols-5">
      {slicedData.length !== 0 ?
        slicedData.map((sneaker, index) => (
          <Fragment key={index}>
            <ProductCard productData={sneaker} productType={"T-shirt"} onClick={(e) =>
              sneakerToCollectionPage(
                sneaker.slug,
                sneaker.brand.slug,
                sneaker.model.slug,
                sneaker.sub_model_category.slug,
                "T-shirt"
              )} />
          </Fragment>
        )) :
        [...Array(numsOfLoad)].map((_, index) => (
          <Fragment key={index}>
            <ProductCard isLoading={isLoading} />
          </Fragment>
        ))
      }
    </div>
  );
};

export default SneakersProductCard;
