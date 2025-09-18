import { useUserName } from "@/context/UserNameContext";
import SneakerItem from "./SneakerItem1";
import Link from "next/link";

const SearchItemContainer = ({ data, error, productModal }) => {
  const { getUser } = useUserName();

  return (
    <>
      {!getUser ? (
        <p className="text-black/50 font-roboto xl:text-[22px] font-normal leading-none">Please <Link className="text-blue-400 underline" href='/sign-in/'>login</Link> or <Link className="text-blue-400 underline" href='/sign-up/'>register</Link> to get your closet.</p>
      ) : (
        <div className="flex flex-wrap gap-8 max-h-[408px] md:max-h-[544px] xl:max-h-96 overflow-y-auto">
          <SneakerItem data={data} productModal={productModal} />
        </div>
      )}
    </>
  );
};

export default SearchItemContainer;
