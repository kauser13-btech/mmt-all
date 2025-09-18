import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const LeftIconCard = ({ icon, title, flexDirection, link }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleUrlNavbar = (url) => {
    if (pathname !== "/collection/") {
      router.push(url);
    } else {
      router.push(url).then(() => router.reload());
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-2 ${flexDirection}`}
      onClick={(e) => handleUrlNavbar(link)}
    >
      <div>{icon}</div>
      <p className="font-roboto text-sm text-title-work-card font-normal">
        {title}
      </p>
    </div>
  );
};

export default LeftIconCard;
