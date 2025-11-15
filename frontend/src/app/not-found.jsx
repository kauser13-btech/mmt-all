import Link from "next/link";

export default function NotFound() {
  return (
    <main className="my-container">
      <div className="flex flex-col items-center justify-center gap-6 w-full py-20 min-h-[60vh]">
        <h1 className="text-4xl md:text-6xl font-staatliches text-gray-900">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 text-center max-w-md">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-orange-primary text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
