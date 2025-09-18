export const useHeaderStyleOnModal = (onScroll, pathname, type) => {
  return `${styles.header} ${
    onScroll ? styles.sticky : type !== "none" ? styles.changingIndex : ""
  } ${pathname === "/" ? styles.bgWhite : styles.linearGradient}`;
};
