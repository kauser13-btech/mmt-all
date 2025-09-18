import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useGetCurrentUserSession = () => {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const getSession = () => {
      const session = Cookies.get("mmt_user_session");

      if (session) {
        setUserSession(session);
      }
    };

    getSession();
  }, []);

  return userSession;
};

export default useGetCurrentUserSession;
