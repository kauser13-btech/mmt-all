import { useEffect, useState } from "react";

const useDomReady = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);
  
  return {domReady, setDomReady};
};

export default useDomReady;
