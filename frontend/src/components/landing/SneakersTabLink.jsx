import React from "react";
import styles from "@/app/styles/landing/sneakersTabLink.module.scss";
const SneakersTabLink = ({ handleTabToggle, toggleTab }) => {
  return (
    <>
      <ul
        className={`${styles.container} ${styles["slidingEffect" + toggleTab]}`}
      >
        <li onClick={() => handleTabToggle(1)}>Recently Added</li>
        <li onClick={() => handleTabToggle(2)}>Best Seller</li>
      </ul>
    </>
  );
};

export default SneakersTabLink;
