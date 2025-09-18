import Link from "next/link";
import Image from "next/image";

// ✅ Product Component
export default function ProductComponent({ product }) {
  return (
    <Link
      href={product.url}
      className="flex flex-col items-center gap-2.5 group text-black py-2"
    >
      <Image
        src={product.image_url}
        alt={product.alt ? product.alt : product.title}
        width={250}
        height={250}
        className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
      />
      <p className="capitalize px-3 text-sub-work-card font-medium text-center text-sm md:text-base xl:text-xl">
        {product.original_title ?? product.title}
      </p>
    </Link>
  );
}