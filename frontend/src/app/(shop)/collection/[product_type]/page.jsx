import Breadcrumb from "@/components/global/Breadcrumb"
import Sidebar from "@/components/collection/Sidebar"
import Category from "@/components/collection/Category"
import SearchBar from "@/components/collection/SearchBar"
import ProductListWithPagination from "@/components/collection/ProductListWithPagination";

import ClosetIcon from "@/components/svg/ClosetIcon";

import { SlidersHorizontal } from "lucide-react"

// Server-side function to fetch products
async function getProducts(productType, page = 1) {
  try {
    const apiUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';
    const response = await fetch(`${apiUrl}/collections/${productType}?page=${page}&per_page=20`, {
      next: { revalidate: 600 } // Cache for 10 minutes (600 seconds)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    // Transform the API data to match the component's expected format
    const transformedProducts = data.data.map((item) => ({
      index: item.id,
      url: `/collection/${productType}/${item.slug}`,
      image_url: item.mockup_url || item.image,
      title: item.title,
      original_title: item.title,
      alt: item.title,
      price: item.price,
      description: item.description,
    }));

    return {
      products: transformedProducts,
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
      }
    };
  }
}

export default async function CollectionProductTypePage({ params, searchParams }) {
  // Format the product type for display (e.g., "T-shirt" or "Hoodie")
  const productType = params.product_type;
  const formattedType = productType.charAt(0).toUpperCase() + productType.slice(1).toLowerCase();

  // Get page from search params
  const page = parseInt(searchParams?.page || '1', 10);

  // Fetch products on the server
  const { products, pagination } = await getProducts(productType, page);

  return (
    <main>
      <Breadcrumb
        title={`Home > Collection > ${formattedType}s`}
      />

      <div className="flex flex-col gap-5 md:flex-row md:gap-x-10 my-container md:mt-11 mb-32">
        <Sidebar />

        <div className="flex w-full flex-col gap-4 mt-0 md:gap-5">
          <Category activeType={productType} />
          <div className="flex w-full gap-5">
            <SearchBar />

            {/* TODO: show color picker on mobile */}
            <button className="md:hidden shadow-md size-12 text-gray-500 rounded-md p-1 flex items-center justify-center bg-white border border-solid border-gray-50">
              <SlidersHorizontal />
            </button>

            {/* Open Closet */}
            <button
              // onClick={() => toggleCloset(!isClosetOpen)}
              className="shadow-md min-w-[143px] h-[52px] xl:h-full xl:min-w-[243px] max-md:hidden justify-between rounded-md px-3 items-center gap-x-1 xl:w-[308px] text-neutral-400 hover:bg-slate-200"
            >
              <div className="flex items-center justify-center gap-4">
                <ClosetIcon color={"#6b7280"} />
                <p className="w-[114.48px] md:text-sm xl:text-base">Open Closet</p>
              </div>
            </button>
          </div>

          {/* main Product List with Pagination - Server-side rendered with client-side navigation */}
          <ProductListWithPagination
            initialProducts={products}
            initialPagination={pagination}
            productType={productType}
          />
        </div>
      </div>
    </main>
  );
}
