"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/global/Breadcrumb";
import { CheckCircle } from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("order_number");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [orderNumber]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://nginx/api/'}orders/${orderNumber}`
      );
      const data = await response.json();
      if (data.success) {
        setOrderDetails(data.order);
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Breadcrumb title="Home > Order Confirmation" />

      <div className="my-container py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-staatliches mb-4">
            Order Confirmed!
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>

          {loading ? (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-600">Loading order details...</p>
            </div>
          ) : orderNumber && orderDetails ? (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-mono text-lg font-semibold">{orderDetails.order_number}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-orange-primary">${orderDetails.total}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="capitalize font-semibold text-green-600">{orderDetails.status}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Email Confirmation Sent To</p>
                <p className="text-sm">{orderDetails.customer_email}</p>
              </div>
            </div>
          ) : orderNumber ? (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="font-mono text-sm break-all">{orderNumber}</p>
            </div>
          ) : null}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-lg mb-2">What's Next?</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>You will receive an email confirmation shortly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>We'll notify you when your order ships</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Track your order status in your account</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/collection/t-shirt")}
              className="px-8 py-3 bg-orange-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main>
        <Breadcrumb title="Home > Order Confirmation" />
        <div className="my-container py-20">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
