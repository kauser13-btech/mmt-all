import { useCloset } from "@/context/ClosetContex";
import ApiTokenBasedWithoutRedirect from "@/lib/util/ApiTokenBasedWithoutRedirect";
import { useState } from "react";
import { toast } from "react-toastify";

const usePostCloseData = () => {
  const { getClosetData, isClosetOpen, toggleCloset } = useCloset();
  const { performPost } = ApiTokenBasedWithoutRedirect();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleAddToCloset = async (type, id) => {
    if (id) {
      try {
        const { response, error } = await performPost("api/v1/closets", {
          sneaker_id: id,
        });

        if (response == null && error) {
          setShowSignInModal(true);
          // toast.update(toastId, {
          //   render: "Please login / register to add closet",
          //   type: "error",
          //   autoClose: 1000,
          //   isLoading: false,
          // });
        } else {
          const toastId = toast.loading("Please wait...");
          if (response.success) {
            (type == 'home' || type == 'collection') && toggleCloset(true);
            getClosetData();
            toast.update(toastId, {
              render: response.message,
              type: "success",
              isLoading: false,
              autoClose: 1000,
            });
          } else {
            toast.update(toastId, {
              render: response.message,
              type: "error",
              isLoading: false,
              autoClose: 1000,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Something went wrong.", {
        autoClose: 1000,
      });
    }
  };

  return { handleAddToCloset, showSignInModal, handleSignInModal };
};

export default usePostCloseData;
