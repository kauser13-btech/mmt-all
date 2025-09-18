import React from "react";
import styles from "@/app/styles/landing/featuredProductTabLink.module.scss";
const FeaturedProductTabLink = ({ handleTabToggle, toggleTab }) => {
  return (
    <ul
      className={`${styles.container} ${styles["slidingEffect" + toggleTab]}`}
    >
      <li onClick={() => handleTabToggle(1)}>Just Dropped</li>
      <li onClick={() => handleTabToggle(2)}>Classic</li>
    </ul>
  );
};

export default FeaturedProductTabLink;
