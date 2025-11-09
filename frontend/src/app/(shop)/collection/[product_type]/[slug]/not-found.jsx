import Link from "next/link";

export default function NotFound() {
  return (
    <main className="my-container">
      <div className="flex flex-col items-center justify-center gap-6 w-full py-20 min-h-[60vh]">
        <h1 className="text-4xl md:text-6xl font-staatliches text-gray-900">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">Product Not Found</h2>
        <p className="text-gray-600 text-center max-w-md">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/collection/t-shirt"
            className="px-6 py-3 bg-orange-primary text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Browse T-Shirts
          </Link>
          <Link
            href="/collection/hoodie"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Browse Hoodies
          </Link>
        </div>
      </div>
    </main>
  );
}
