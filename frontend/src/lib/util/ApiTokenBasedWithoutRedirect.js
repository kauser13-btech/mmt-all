"use client";
import Cookies from "js-cookie";

const ApiTokenBasedWithoutRedirect = () => {
  const performRequest = async (url, methodType, data) => {
    const userToken = Cookies.get("mmt_user_session");

    try {
      if (!userToken) {
        return { response: null, error: "User not authenticated" };
      }

      let response;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`;

      const headers = {
        "Accept": "application/json",
        Authorization: `Bearer ${userToken}`,
      };

      if (methodType !== "GET") {
        headers["Content-Type"] = "application/json";
      }

      const requestOptions = {
        method: methodType,
        headers,
        body: methodType !== "GET" ? JSON.stringify(data) : undefined,
      };

      response = await fetch(apiUrl, requestOptions);

      const responseData = await response.json();

      if (response.status === 401) {
        return { response: null, error: "Unauthorized token" };
      } else {
        return { response: responseData, error: null };
      }
    } catch (error) {
      console.log("Error in API call:", error);
      return { response: null, error: error };
    }
  };

  const performGet = async (url) => {
    return performRequest(url, "GET");
  };

  const performPost = async (url, data) => {
    return performRequest(url, "POST", data);
  };

  const performPut = async (url, data) => {
    return performRequest(url, "PUT", data);
  };

  const performDelete = async (url) => {
    return performRequest(url, "DELETE");
  };

  return {
    performGet,
    performPost,
    performPut,
    performDelete,
  };
};

export default ApiTokenBasedWithoutRedirect;
