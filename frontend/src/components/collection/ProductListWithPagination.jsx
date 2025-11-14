import ProductComponent from "@/components/global/ProductComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductListWithPagination({ initialProducts, initialPagination, productType }) {
  const products = initialProducts;
  const pagination = initialPagination;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, pagination.current_page - 2);
    let end = Math.min(pagination.last_page, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full py-20">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 xl:gap-20 w-full">
      {/* Product Grid */}
      <div className="grid gap-x-5 gap-y-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {products.map((product) => (
          <ProductComponent key={product.index} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Pagination info */}
          <p className="text-sm text-gray-600">
            Showing {pagination.from || ((pagination.current_page - 1) * pagination.per_page + 1)} to {pagination.to || Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} products
          </p>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            {/* Previous button */}
            {pagination.current_page === 1 ? (
              <button
                disabled
                className="p-2 rounded-md border border-gray-300 opacity-50 cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
            ) : (
              <Link
                href={`/collection/${productType}?page=${pagination.current_page - 1}`}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </Link>
            )}

            {/* First page */}
            {pagination.current_page > 3 && (
              <>
                <Link
                  href={`/collection/${productType}?page=1`}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  1
                </Link>
                {pagination.current_page > 4 && <span className="px-2">...</span>}
              </>
            )}

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
              page === pagination.current_page ? (
                <span
                  key={page}
                  className="px-4 py-2 rounded-md border bg-orange-primary text-white border-orange-primary"
                >
                  {page}
                </span>
              ) : (
                <Link
                  key={page}
                  href={`/collection/${productType}?page=${page}`}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {page}
                </Link>
              )
            ))}

            {/* Last page */}
            {pagination.current_page < pagination.last_page - 2 && (
              <>
                {pagination.current_page < pagination.last_page - 3 && <span className="px-2">...</span>}
                <Link
                  href={`/collection/${productType}?page=${pagination.last_page}`}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {pagination.last_page}
                </Link>
              </>
            )}

            {/* Next button */}
            {pagination.current_page === pagination.last_page ? (
              <button
                disabled
                className="p-2 rounded-md border border-gray-300 opacity-50 cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            ) : (
              <Link
                href={`/collection/${productType}?page=${pagination.current_page + 1}`}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
