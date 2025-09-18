import React from "react";
import styles from "@/app/styles/landing/outfitCategoryTabLink.module.scss";
const OutfitCategoryTabLink = ({ handleTabToggle, toggleTab }) => {
  return (
    <ul className={`${styles.container} ${styles["slidingEffect" + toggleTab]}`}>
      <li onClick={() => handleTabToggle(1)}>T-Shirt</li>
      <li onClick={() => handleTabToggle(2)}>Gym Bags</li>
      <li onClick={() => handleTabToggle(3)}>Hoodies</li>
      <li onClick={() => handleTabToggle(4)}>Crop Tops</li>
      <li onClick={() => handleTabToggle(5)}>Socks</li>
    </ul>
  );
};

export default OutfitCategoryTabLink;
