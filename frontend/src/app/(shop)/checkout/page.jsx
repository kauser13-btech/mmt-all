"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/global/Breadcrumb";
import { toast } from "react-toastify";
import StripePaymentForm from "@/components/stripe/StripePaymentForm";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",

    // Shipping Address
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [loading, setLoading] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateContactAndShipping = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setFormValidated(true);
    toast.success("Information validated. Please complete payment below.");
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    setLoading(true);

    try {
      // Here you would save the order to your backend
      console.log("Order data:", {
        items: cart,
        total: total,
        customer: formData,
        paymentIntentId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
      });

      toast.success("Payment successful! Your order has been placed.");
      clearCart();

      // Redirect to order confirmation with payment intent ID
      setTimeout(() => {
        router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
      }, 1500);
    } catch (error) {
      toast.error("Order processing failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (errorMessage) => {
    toast.error(errorMessage || "Payment failed. Please try again.");
  };

  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const total = cartTotal + shippingCost + tax;

  if (!cart || cart.length === 0) {
    return (
      <main>
        <Breadcrumb title="Home > Checkout" />
        <div className="my-container py-20">
          <div className="text-center">
            <h2 className="text-2xl font-staatliches mb-4">Your cart is empty</h2>
            <button
              onClick={() => router.push("/collection/t-shirt")}
              className="px-6 py-3 bg-orange-primary text-white rounded-md hover:bg-orange-600"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Breadcrumb title="Home > Checkout" />

      <div className="my-container py-8 md:py-12">
        <h1 className="text-3xl font-staatliches mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={validateContactAndShipping} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formValidated}
                    required
                    className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={formValidated}
                    className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={formValidated}
                      required
                      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={formValidated}
                      required
                      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={formValidated}
                    required
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                  />
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    disabled={formValidated}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={formValidated}
                      required
                      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State *"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled={formValidated}
                      required
                      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code *"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      disabled={formValidated}
                      required
                      className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Validate Button */}
              {!formValidated && (
                <button
                  type="submit"
                  className="w-full py-4 bg-orange-primary text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                >
                  Continue to Payment
                </button>
              )}

              {formValidated && (
                <button
                  type="button"
                  onClick={() => setFormValidated(false)}
                  className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                >
                  Edit Information
                </button>
              )}
            </form>

            {/* Stripe Payment Form */}
            {formValidated && (
              <div className="mt-8">
                <StripePaymentForm
                  amount={total}
                  formData={formData}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart?.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Size: {item.size}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {cartTotal < 50 && (
                <p className="text-xs text-gray-600 mt-4">
                  Add ${(50 - cartTotal).toFixed(2)} more for FREE shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
