import { useEffect, useState } from "react";
import TailwindDrawer from "../global/drawerMenu/TailwindDrawer";
import NavLInkMenu from "../global/menuDrawer/finalComponents/NavLInkMenu";
import MmtLogo from "./MmtLogo";

import { usePathname, useSearchParams } from "next/navigation";

const BurgerIcon = ({ setClosetOpen, urls }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname, searchParams]);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  return (
    <>
      <svg
        onClick={(e) => handleOpenDrawer()}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        className="cursor-pointer"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.947368 0C0.696111 0 0.455144 0.0978246 0.277478 0.271953C0.0998117 0.446082 0 0.68225 0 0.928505C0 1.17476 0.0998117 1.41093 0.277478 1.58506C0.455144 1.75919 0.696111 1.85701 0.947368 1.85701H17.0526C17.3039 1.85701 17.5449 1.75919 17.7225 1.58506C17.9002 1.41093 18 1.17476 18 0.928505C18 0.68225 17.9002 0.446082 17.7225 0.271953C17.5449 0.0978246 17.3039 0 17.0526 0H0.947368ZM0 6.49954C0 6.25328 0.0998117 6.01711 0.277478 5.84298C0.455144 5.66886 0.696111 5.57103 0.947368 5.57103H17.0526C17.3039 5.57103 17.5449 5.66886 17.7225 5.84298C17.9002 6.01711 18 6.25328 18 6.49954C18 6.74579 17.9002 6.98196 17.7225 7.15609C17.5449 7.33022 17.3039 7.42804 17.0526 7.42804H0.947368C0.696111 7.42804 0.455144 7.33022 0.277478 7.15609C0.0998117 6.98196 0 6.74579 0 6.49954ZM0 12.0715C0 11.8252 0.0998117 11.5891 0.277478 11.4149C0.455144 11.2408 0.696111 11.143 0.947368 11.143H17.0526C17.3039 11.143 17.5449 11.2408 17.7225 11.4149C17.9002 11.5891 18 11.8252 18 12.0715C18 12.3177 17.9002 12.5539 17.7225 12.728C17.5449 12.9022 17.3039 13 17.0526 13H0.947368C0.696111 13 0.455144 12.9022 0.277478 12.728C0.0998117 12.5539 0 12.3177 0 12.0715Z"
          fill="black"
        />
      </svg>

      <TailwindDrawer
        isOpen={isOpen}
        title={<MmtLogo color="black" />}
        setIsOpen={setIsOpen}
        position="left"
        background="mobile-left-drawer-gradient"
      >
        <NavLInkMenu
          setIsOpen={() => setIsOpen(false)}
          setClosetOpen={() => {
            setClosetOpen();
            setIsOpen(false);
          }}
          urls={urls}
        />
      </TailwindDrawer>
    </>
  );
};

export default BurgerIcon;
