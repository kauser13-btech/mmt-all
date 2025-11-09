import { notFound } from "next/navigation";
import Breadcrumb from "@/components/global/Breadcrumb";
import ProductImageWrapper from "@/app/(shop)/product/[category]/components/ProductImageWrapper";
import ProductContainer from "@/app/(shop)/product/[category]/components/ProductContainer";
import ProductDetailsTab from "@/app/(shop)/product/[category]/components/ProductDetailsTab";
import Service from "@/app/(shop)/product/[category]/components/Service";

// Fetch product data on the server
async function getProductData(product_type, slug) {
  try {
    // Use internal Docker network URL for server-side fetching
    const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';
    const response = await fetch(`${apiUrl}/collections/${product_type}/${slug}`, {
      cache: 'no-store', // Disable caching for dynamic data, or use 'force-cache' with revalidate
      // next: { revalidate: 3600 } // Optional: Revalidate every hour
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    // Transform API data to match existing product page format
    return {
      data: {
        id: result.data.id,
        title: result.data.title,
        type: product_type === 't-shirt' ? 'T-shirt' : 'Hoodie',
        color: "Multiple Colors Available",
        price: result.data.price,
        currency: "USD",
        material: "Premium Cotton",
        image_urls: [
          { url: result.data.image },
          ...(result.data.images || []).map(url => ({ url }))
        ],
        sneaker: null,
        design: null,
        available_colors: [
          { name: "Default", code: "#000000", is_selected: true },
        ],
        available_sizes: [
          { size: "S", in_stock: true },
          { size: "M", in_stock: true },
          { size: "L", in_stock: true },
          { size: "XL", in_stock: true },
          { size: "XXL", in_stock: true },
        ],
        description: result.data.description,
        details: "100% premium cotton, machine washable, available in multiple sizes.",
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { product_type, slug } = params;
  const product = await getProductData(product_type, slug);

  if (!product) {
    return {
      title: 'Product Not Found | MatchMyTees',
    };
  }

  const { data } = product;
  const formattedType = product_type.charAt(0).toUpperCase() + product_type.slice(1);

  return {
    title: `${data.title} | ${formattedType} | MatchMyTees`,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.image_urls.map((img) => img.url),
      type: "website",
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/collection/${product_type}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image_urls[0]?.url],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/collection/${product_type}/${slug}`,
    },
  };
}

// JSON-LD schema for SEO
function ProductSchema({ product, product_type, slug }) {
  const { data } = product;
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: data.title,
    image: data.image_urls.map((img) => img.url),
    description: data.description,
    sku: `COLLECTION-${data.id}`,
    brand: {
      "@type": "Brand",
      name: "MatchMyTees",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/collection/${product_type}/${slug}`,
      priceCurrency: data.currency,
      price: data.price,
      availability: "https://schema.org/InStock",
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

export default async function CollectionItemDetailPage({ params }) {
  const { product_type, slug } = params;

  // Fetch product data on the server
  const product = await getProductData(product_type, slug);

  // Show 404 if product not found
  if (!product) {
    notFound();
  }

  const { data } = product;
  const formattedType = product_type.charAt(0).toUpperCase() + product_type.slice(1);

  return (
    <main>
      {/* Structured data for SEO */}
      <ProductSchema product={product} product_type={product_type} slug={slug} />

      <Breadcrumb title={`Home > Collection > ${formattedType} > ${data.title}`} />

      <div className="my-container grid h-full w-full gap-7 pt-0 sm:pt-[30px] md:grid-cols-2 md:gap-5 md:px-[40px] lg:grid-cols-[1fr_415px] xl:grid-cols-[1fr_558px] xl:gap-12">
        <ProductImageWrapper data={data} />

        <ProductContainer data={data} sneaker={data.sneaker} design={data.design} />

        <ProductDetailsTab
          data={data}
          customClass="md:col-span-2 lg:hidden"
        />
      </div>

      <Service />
    </main>
  );
}
