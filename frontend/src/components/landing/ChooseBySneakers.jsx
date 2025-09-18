"use client";
import Image from 'next/image';
import ApiCall from "@/lib/util/ApiCall";
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TailwindDropdown from "../ui/TailwindDropdown";

const
  ChooseBySneakers = () => {
    const { performGet } = ApiCall();
    const [data, setData] = useState([]);
    const [modalCategory, setModalCategory] = useState([]);
    const [outfitCategory, setOutfitCategory] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("Brand");
    const [selectedModel, setSelectedModel] = useState("Model");
    const [selectedOutfit, setSelectedOutfit] = useState("Outfit");
    const [error, setError] = useState("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      brand_id: "",
      model_id: "",
      sub_model_category_id: "",
      product_id: "",
    });
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const fetchDataFromApi = async () => {
      const response = await performGet("api/v1/all-categories?type=2");

      if (response.status === 200) {
        setData(response.data);
      }
    };
    useEffect(() => {
      fetchDataFromApi();
    }, []);
    useEffect(() => {
      checkIfDataIsFilled();
    }, [formData.brand_id]);
    const checkIfDataIsFilled = () => {
      const isFormDataFilled = formData.brand_id !== "";
      if (isFormDataFilled) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    const onSelectGetChange = (e, slug) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        brand_id: slug,
      }));
      if (slug !== "") {
        const childData = data.find((brand) => brand.slug === slug);
        setSelectedBrand(childData.title);
        setModalCategory(childData.recursive_children);
        setOutfitCategory([
          { slug: "T-shirt", title: "T-shirt" },
          { slug: "Hoodie", title: "Hoodie" },
        ]);
      } else {
        setModalCategory([]);
        setOutfitCategory([
          { slug: "T-shirt", title: "T-shirt" },
          { slug: "Hoodie", title: "Hoodie" },
        ]);
      }
    };
    const onSelectModelChange = (e, slug) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sub_model_category_id: slug,
      }));
      setSelectedModel(e.target.innerText);
      if (slug !== "") {
        // const childData = modalCategory.find((brand) => brand.slug === id);
        // setOutfitCategory(childData.recursive_children);
        setOutfitCategory([
          { slug: "T-shirt", title: "T-shirt" },
          { slug: "Hoodie", title: "Hoodie" },
        ]);
      } else {
        setOutfitCategory([
          { slug: "T-shirt", title: "T-shirt" },
          { slug: "Hoodie", title: "Hoodie" },
        ]);
      }
    };
    const onSelectOutfitChange = (e, slug) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        product_id: slug,
      }));
      setSelectedOutfit(e.target.innerText);
    };

    useEffect(() => {
      if (!(formData.brand_id === "" || formData.product_id === "" || formData.sub_model_category_id === "")) {
        handleSearch();
      }
    }, [formData.brand_id, formData.product_id, formData.sub_model_category_id]);

    const handleSearch = () => {
      setIsLoading(true);

      if (formData.brand_id === "" || formData.product_id === "" || formData.sub_model_category_id === "") {
        toast.warn('Please select Brand and Outfit Category', {
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        setIsLoading(false); // Move it inside the if block
      } else {
        router.push(
          `/collection?brand=${formData.brand_id}&model=${formData.model_id}&product_type=${formData.product_id}&sub_model_category=`
        );
        setIsLoading(false); // Move it inside the else block
      }
    };

    return (
      <div className="top-bottom-margin">
        <div className="choose-by-sneakers-gradient py-10 md:py-14 lg:py-24">
          <div className="my-container flex flex-col gap-16">
            <div className="flex flex-col items-center gap-6 md:gap-8 xl:gap-[71px]">
              <div className="flex flex-col items-center gap-8">
                <h2
                  className="font-staatliches text-3xl text-title-work-card md:tracking-[0.52px] md:leading-[30px]
               lg:text-[45px] lg:tracking-[0.072px]"
                >
                  Choose by Sneakers
                </h2>
                <p className="text-center text-sub-work-card font-roboto text-xl w-full leading-6 md:font-medium lg:text-2xl">
                  Select your sneaker's brand name, model number, and
                  <br className="hidden md:block" /> outfit category to match your sneaker.
                </p>
              </div>
              <div className="flex flex-col max-md:items-center w-full gap-20 md:flex-row md:gap-[22px]">
                <div className="flex flex-col items-center gap-16 w-full">
                  {Object.keys(data).length !== 0 ? (
                    <TailwindDropdown title={selectedBrand}
                      placeholder="brand"
                      items={data}
                      onSelectGetChange={onSelectGetChange} />) : (
                    <TailwindDropdown title={selectedBrand}
                      placeholder="brand"
                      items={data}
                      onSelectGetChange={onSelectModelChange} />

                  )}

                  <div className="h-full flex items-end">
                    <Image
                      className="size-[225px]"
                      src={"/images/landing/chooseBySneakers/brand.png"}
                      alt="Brand"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-16 w-full">
                  {Object.keys(modalCategory).length !== 0 ? (
                    <TailwindDropdown title={selectedModel}
                      placeholder="model"
                      items={modalCategory}
                      onSelectGetChange={onSelectModelChange} />) : (
                    <TailwindDropdown title={selectedModel}
                      placeholder="model"
                      items={[]}
                      onSelectGetChange={onSelectModelChange} />

                  )}
                  <div className="h-full flex items-end">
                    <Image
                      className="size-[225px]"
                      src={"/images/landing/chooseBySneakers/shoes.png"}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-16 w-full">
                  {Object.keys(outfitCategory).length !== 0 ? (
                    <TailwindDropdown title={selectedOutfit}
                      placeholder="outfit"
                      items={outfitCategory}
                      onSelectGetChange={onSelectOutfitChange} />) : (
                    <TailwindDropdown title={selectedOutfit}
                      placeholder="outfit"
                      items={[]}
                      onSelectGetChange={onSelectModelChange} />

                  )}

                  <div className="h-full flex items-end">
                    <Image
                      className="size-[225px]"
                      src={"/images/landing/chooseBySneakers/tShirt.png"}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-center gap-4 w-full font-roboto text-sm">
            <button
              type="submit"
              className={`${formData.brand_id == "" || formData.product_id == "" ? "bg-gray-400/75 hover:bg-gray-400/75 active:bg-gray-400/75" : "bg-orange-primary hover:bg-orange-primary/80 active:bg-orange-primary/90"} btn btn-lg px-9 w-fit border-none text-white
                text-sm md:px-12 md:font-medium md:text-base xl:px-14 xl:text-[22px] xl:leading-[22.4px] ${isButtonDisabled ? "" : ""
                }`}
              onClick={handleSearch}
            // disabled={formData.brand_id == "" || formData.product_id == ""} 
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
            <p className="text-title-work-card font-normal text-sm xl:text-lg hover:underline">
              Can't find your sneaker?
            </p>
          </div> */}
          </div>
        </div>
      </div >
    );
  };

export default ChooseBySneakers;
