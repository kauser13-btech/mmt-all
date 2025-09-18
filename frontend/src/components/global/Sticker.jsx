import Image from "next/image";


export default function Sticker({ extraClass, isCheckout = false }) {
  return (
    <div className={"flex flex-col gap-4 " + extraClass}>
      {isCheckout && <Image src="/images/mmt-sticker-2.png" alt="Sticker" width={500} height={500} />}
      {!isCheckout && <Image src="/images/mmt-sticker-1.png" alt="Sticker" width={500} height={500} />}
    </div>

  );
};

