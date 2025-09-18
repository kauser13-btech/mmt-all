"use client";

const ApiCall = () => {
  const performGet = async (url) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const performPost = async (url, data) => {
    // console.log("data", data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, 
          body: JSON.stringify(data),
        }
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }
  };

  const performPut = async (url, data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const performDelete = async (url) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    performGet,
    performPost,
    performPut,
    performDelete,
  };
};

export default ApiCall;
