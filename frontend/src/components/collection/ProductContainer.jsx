"use client";

import { useState, useEffect } from "react";
import ProductComponent from "@/components/global/ProductComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Product Container with Pagination
export const ProductContainer = ({ productType }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api';
      const response = await fetch(`${apiUrl}/collections/${productType}?page=${page}&per_page=20`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // Transform the API data to match the component's expected format
      const transformedProducts = data.data.map((item) => ({
        index: item.id,
        url: `/collection/${productType}/${item.slug}`,
        image_url: item.image,
        title: item.title,
        original_title: item.title,
        alt: item.title,
        price: item.price,
        description: item.description,
      }));

      setProducts(transformedProducts);
      setPagination(data.pagination);

      // Scroll to top when page changes
      if (page > 1) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productType) {
      fetchProducts(1);
    }
  }, [productType]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchProducts(newPage);
    }
  };

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-primary"></div>
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full py-20">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-primary text-white rounded-md hover:bg-orange-600"
        >
          Retry
        </button>
      </div>
    );
  }

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
            Showing {pagination.from} to {pagination.to} of {pagination.total} products
          </p>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            {/* First page */}
            {pagination.current_page > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  1
                </button>
                {pagination.current_page > 4 && <span className="px-2">...</span>}
              </>
            )}

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md border ${
                  page === pagination.current_page
                    ? 'bg-orange-primary text-white border-orange-primary'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {pagination.current_page < pagination.last_page - 2 && (
              <>
                {pagination.current_page < pagination.last_page - 3 && <span className="px-2">...</span>}
                <button
                  onClick={() => handlePageChange(pagination.last_page)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  {pagination.last_page}
                </button>
              </>
            )}

            {/* Next button */}
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
