import Breadcrumb from "@/components/global/Breadcrumb"
import Sidebar from "@/components/collection/Sidebar"
import Category from "@/components/collection/Category"
import SearchBar from "@/components/collection/SearchBar"
import { ProductContainer } from "@/components/collection/ProductContainer"

import ClosetIcon from "@/components/svg/ClosetIcon";

import { SlidersHorizontal } from "lucide-react"

export default function CollectionPage() {
  return (
    <main>
      <Breadcrumb
        // TODO: set active category btn
        title={"Home > Collection >" + " T-Shirts"}
      />

      <div className="flex flex-col gap-5 md:flex-row md:gap-x-10 my-container md:mt-11 mb-32">
        <Sidebar />

        <div className="flex w-full flex-col gap-4 mt-0 md:gap-5">
          <Category />
          <div className="flex w-full gap-5">
            <SearchBar />

            {/* TODO: show color picker on mobile */}
            <button className="md:hidden shadow-md size-12 text-gray-500 rounded-md p-1 flex items-center justify-center bg-white border border-solid border-gray-50">
              <SlidersHorizontal />
            </button>

            {/* Open Closet */}
            <button
              // onClick={() => toggleCloset(!isClosetOpen)}
              className="shadow-md min-w-[143px] h-[52px] xl:h-full xl:min-w-[243px] max-md:hidden justify-between rounded-md px-3 items-center gap-x-1 xl:w-[308px] text-neutral-400 hover:bg-slate-200"
            >
              <div className="flex items-center justify-center gap-4">
                <ClosetIcon color={"#6b7280"} />
                <p className="w-[114.48px] md:text-sm xl:text-base">Open Closet</p>
              </div>
            </button>
          </div>

          {/* main Product List */}
          <ProductContainer />
        </div>
      </div>
    </main>
  );
};