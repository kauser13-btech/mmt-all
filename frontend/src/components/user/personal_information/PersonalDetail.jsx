"use client";
import React, { useState, useCallback, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ApiTokenBased from "@/lib/util/ApiTokenBased";
import Cookies from "js-cookie";
import { useUserName } from "@/context/UserNameContext";

const PersonalDetail = () => {
  const { performGet } = ApiTokenBased();
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  let [newName, setNewName] = useState();
  let [newPhone, setNewPhone] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      localStorage.setItem("profilePicture", selectedImage);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = async (event) => {
    setNewName(event.target.value)
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const { performPost } = ApiTokenBased();
  const handleSubmitInfo = async () => {
    setNewName(newName.trim().replace(/ +(?= )/g, ''));
    setNewPhone(newPhone.trim().replace(/ +(?= )/g, ''));

    if (newName && newPhone !== "" && (newName.trim() != info.name || newPhone != info.phone)) {
      setIsLoading(true);
      const infoData = {
        name: newName,
        phone: newPhone,
        email: info.email,
      };

      const response = await performPost("api/v1/profile-update", infoData);
      if (response.response.success) {
        setIsLoading(false);
        setInfo(response.response.data);
        Cookies.set("mmt_user_name", infoData.name);
      } else {
        setIsLoading(false);
      }
    }

    else {
      alert("Name or Phone is invalid");
    }
  };

  const handleImageSubmit = async () => {
    setSelectedImage(String(selectedImage));
    // setTimeout(async () => {
    try {
      if (selectedImage.length < 300) return;
      setIsLoading(true);
      let data = await performPost("api/v1/image-update", {
        image: selectedImage,
      });
      console.log(data.response.success)
      if (data.response.success) {
        setIsLoading(false);
        // console.log(document.getElementById("update_profile_picture").close())
        setSelectedImage(data.response.data.image_url);
        window.location.reload();
        document.getElementById("update_profile_picture").close();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
    // }, 200);
  };

  const handlerevertImage = () => {
    setSelectedImage(localStorage.getItem('profilePicture') || info.image_url)
  }

  const fetchDataFromApi = async () => {
    setIsLoading(true);
    const { response, error } = await performGet("api/v1/profile");

    if (response) {
      setInfo(response.data);
      setIsLoading(false);
      setNewName(response.data.name);
      setNewPhone(response.data.phone);
      if (response.data.image_url === "") {
        setSelectedImage("/images/avatar.webp");
      } else {
        setSelectedImage(response.data.image_url);
      }
    } else {
      setError(response);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="w-full h-[460px] py-[42px] px-10 bg-white ">
          <div className="">
            <p className="text-xl font-bold text-[#535D72] pb-[10px] mb-[30px] border-b border-b-[#D9D9D9]">
              Personal Information
            </p>

            <div className="dropdown">
              <button className="hover:opacity-70" tabIndex={0} role="button">
                <img
                  className="h-[60px] w-[60px] rounded-full"
                  src={selectedImage}
                  alt="avatar"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    className="font-medium"
                    onClick={() =>
                      document
                        .getElementById("update_profile_picture")
                        .showModal()
                    }
                  >
                    Change
                  </a>
                </li>
              </ul>
            </div>

            <ul className="list-none">
              <li className="mt-[40px]">
                {" "}
                <p className="text-[#838697] flex">
                  <b className="md:w-[150px]">Name:</b>{" "}
                  <span className="ml-2.5">{info.name}</span>
                </p>
              </li>
              <li className="mt-[20px]">
                <p className="text-[#838697] flex">
                  <b className="md:w-[150px]">Email:</b>{" "}
                  <span className="ml-2.5">{info.email}</span>
                </p>
              </li>
              <li className="mt-[20px]">
                {" "}
                <p className="text-[#838697] flex">
                  <b className="md:w-[150px]">Phone Number:</b>
                  <span className="ml-2.5">{info.phone}</span>
                </p>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <button
              className="py-[10px] px-[30px] bg-[#05a5ac] text-white lg:ml-[80%] "
              onClick={() =>
                document.getElementById("update_information").showModal()
              }
            >
              Edit
            </button>

            <dialog id="update_information" className="modal">
              <div className="modal-box bg-white text-black">
                <h3 className="font-bold text-lg">Edit Personal Information</h3>
                <div className="py-4">
                  <label htmlFor="name-changer"> Name</label>
                  <input
                    id="name-changer"
                    type="text"
                    className="mt-2 p-2 bg-gray-100 w-full rounded-lg"
                    value={newName}
                    placeholder={newName}
                    onChange={handleNameChange}
                  />
                </div>

                <div className="pb-4">
                  <label htmlFor="phone-changer"> Phone</label>
                  <input
                    id="phone-changer"
                    type="tel"
                    placeholder={newPhone}
                    className="mt-2 p-2 bg-gray-100 w-full rounded-lg"
                    value={newPhone}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="modal-action">
                  <button
                    className="btn bg-[#05a5ac] hover:bg-[#00a1a1] text-white border-none"
                    onClick={handleSubmitInfo}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                  <form method="dialog">
                    <button className="btn btn-error text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            <dialog id="update_profile_picture" className="modal">
              <div className="modal-box bg-white  w-inherit xs:w-[300px] sm:w-[320px]  lg:w-full select-none ">
                <div className=" flex flex-col items-center space-y-4">
                  <h3 className="font-semibold  lg:font-bold text-sm lg:text-lg text-center">
                    Change Profile Picture
                  </h3>
                  <div className="relative">
                    <button
                      className=" bg-[#05a5ac] hover:bg-[#00a1a1] text-white h-fit py-1 px-3 rounded-lg absolute m-auto left-0 right-0 top-[80px] lg:top-[100px] bottom-0 w-fit"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Change
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </button>
                    <img
                      className="rounded-full size-[150px] lg:size-[200px]"
                      src={selectedImage}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    className="btn bg-[#05a5ac] hover:bg-[#00a1a1] text-white border-none"
                    onClick={handleImageSubmit}
                  >
                    Submit
                  </button>
                  <form method="dialog" className=" space-x-[30px]">
                    <button className="btn btn-error text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[640px] h-[460px] py-[42px] px-10 bg-white">
          <p className="text-sm font-bold text-[#535D72] mb-[30px]">
            Personal Information
          </p>
          <Skeleton width={50} height={50} />
          <ul className="list-none">
            <li className="mt-[40px]">
              {" "}
              <p className="text-[#838697]">
                Name: <Skeleton width={100} />
              </p>
            </li>
            <li className="mt-[40px]">
              <p className="text-[#838697]">
                Email: <Skeleton width={100} />
              </p>
            </li>
            <li className="mt-[40px]">
              {" "}
              <p className="text-[#838697]">
                Phone Number: <Skeleton width={100} />
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PersonalDetail;
