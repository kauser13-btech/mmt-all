"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "@/app/styles/common/drawer/drawer.module.scss";

const Drawer = ({ modalHandle, isOpen, children }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector("#shoppingCart");
    setMounted(true);
  }, []);
  return mounted && ref.current
    ? createPortal(
        <>
          <motion.div
            animate={{
              right: isOpen ? 0 : -1000,
              // display: isOpen ? "block" : "none",
              // overflowY: "auto",
            }}
            transition={{ ease: "linear", duration: 0.3 }}
            className={`${styles.container} ${
              isOpen ? styles.sliderOn : styles.sliderOff
            }`}
          >
            <img
              onClick={() => modalHandle()}
              src="/images/close.svg"
              className={styles.closeButton}
              alt="close"
            />
            <div className={styles.wrapper}>{children}</div>
          </motion.div>
          <div
            className={`${isOpen ? styles.backgroundBlur : styles.sliderOff}`}
            onClick={() => modalHandle()}
          ></div>
        </>,
        ref.current
      )
    : null;
};

export default Drawer;
