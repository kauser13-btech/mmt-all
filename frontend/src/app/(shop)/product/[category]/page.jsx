import Breadcrumb from "@/components/global/Breadcrumb";
import ProductImageWrapper from "./components/ProductImageWrapper";
import ProductContainer from "./components/ProductContainer";
import ProductDetailsTab from "./components/ProductDetailsTab";
import Service from "./components/Service";

// ✅ Demo product data
const product = {
  data: {
    id: 1,
    title: "Jordan Match T-Shirt",
    type: "T-shirt",
    color: "Red",
    price: "29.99",
    currency: "USD",
    material: "Cotton",
    image_urls: [
      { url: "https://picsum.photos/id/123/800/600" },
      { url: "https://picsum.photos/id/124/800/600" },
      { url: "https://picsum.photos/id/125/800/600" },
    ],
    sneaker: { id: 101, slug: "jordan-1" },
    design: { id: 201, slug: "match-design", title: "Match Design" },
    available_colors: [
      { name: "Red", code: "#FF0000", is_selected: true },
      { name: "Blue", code: "#0000FF", is_selected: false },
    ],
    available_sizes: [
      { size: "S", in_stock: true },
      { size: "M", in_stock: true },
      { size: "L", in_stock: false },
      { size: "XL", in_stock: true },
    ],
    description:
      "This Jordan Match T-Shirt features a classic design with breathable fabric, perfect for everyday wear or pairing with your favorite sneakers.",
    details:
      "100% cotton, machine washable, available in multiple colors and sizes.",
  },
};

const { data } = product;

// ✅ Next.js SEO metadata
export const metadata = {
  title: `${data.title} | MatchMyTees`,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    images: data.image_urls.map((img) => img.url),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    images: [data.image_urls[0]?.url],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/products/${data.id}`,
  },
};

// ✅ JSON-LD schema
function ProductSchema({ product }) {
  const { data } = product;
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: data.title,
    image: data.image_urls.map((img) => img.url),
    description: data.description,
    sku: `SKU-${data.id}`,
    brand: {
      "@type": "Brand",
      name: "Jordan",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${data.id}`,
      priceCurrency: data.currency,
      price: data.price,
      availability: data.available_sizes.some((s) => s.in_stock)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProductPage() {
  const sneaker = data.sneaker;
  const design = data.design;

  return (
    <main>
      {/* ✅ Structured data for SEO */}
      <ProductSchema product={product} />

      <Breadcrumb title={`Home > ${data.type} > ${data.title}`} />

      <div className="my-container grid h-full w-full gap-7 pt-0 sm:pt-[30px] md:grid-cols-2 md:gap-5 md:px-[40px] lg:grid-cols-[1fr_415px] xl:grid-cols-[1fr_558px] xl:gap-12">
        <ProductImageWrapper data={data} />

        <ProductContainer data={data} sneaker={sneaker} design={design} />

        <ProductDetailsTab
          data={data}
          customClass="md:col-span-2 lg:hidden"
        />
      </div>

      <Service />
    </main>
  );
}
