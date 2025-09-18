import { useCloset } from "@/context/ClosetContex";
import usePostCloseData from "@/hooks/closets/usePostCloseData";
import SearchUtil from "../global/searchSneakerModal/SearchUtil";
import { useUserName } from "@/context/UserNameContext";

const Search = ({ type, handleChangeSneaker, isOpen, toggle }) => {
  const { handleAddToCloset, showSignInModal, handleSignInModal } =
    usePostCloseData();
  const { getClosetData, data, error } = useCloset();
  const { getUser } = useUserName();
  const handlePostCloset = async (id) => {
    // toggle(false);
    getUser
      ? ""
      : document.getElementById("sign-in-modal-in-search").showModal();
    await handleAddToCloset(type, id);
    getClosetData();
  };
  return (
    <>
      <SearchUtil
        toggle={toggle}
        handlePostCloset={handlePostCloset}
        handleChangeSneaker={handleChangeSneaker}
        isOpen={isOpen}
        type={type}
      />
    </>
  );
};

export default Search;
