import Link from "next/link";
const MenuLinkCard = ({ title, path, onClick }) => {
  return !path ? (
    <p
      onClick={onClick ? onClick : null}
      className="cursor-pointer text-sm text-title-work-card font-semibold font-roboto"
    >
      {title}
    </p>
  ) : (
    <Link
      onClick={onClick}
      className="text-sm text-title-work-card font-semibold font-roboto"
      href={path}
    >
      {title}
    </Link>
  );
};

export default MenuLinkCard;
