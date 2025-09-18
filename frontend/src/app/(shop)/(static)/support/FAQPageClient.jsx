'use client';

import { useState } from 'react';
import PageHeader from "@/components/global/PageHeader";
import Breadcrumb from "@/components/global/Breadcrumb";
import { toast } from "react-toastify";

// Helper function to replace template variables with actual links
const replaceAnchors = (text, targets) => {
  let result = text;
  targets.forEach(target => {
    const placeholder = `{{${target.key}}}`;
    const link = `<a href="${target.href}" class="text-blue-600 font-bold">${target.text}</a>`;
    result = result.replace(new RegExp(placeholder, 'g'), link);
  });
  return result;
};

export default function FAQPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [successStatus, setSuccessStatus] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for contacting us. We will contact you soon.");
        resetForm();
        setSuccessStatus(true);
      } else {
        toast.error("There was an error submitting the form. Please try again later.");
      }
    } catch (error) {
      toast.error("There was an error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqs = [
    {
      question: "How do I place an order for a sneaker match t-shirt?",
      answer: "To find matching t-shirt designs for your sneaker model, simply visit our website and enter the name or model number of your sneakers. We'll present you with a wide range of styles and colors to choose from. Once you have selected your preferred design, choose the size and quality you want and complete the checkout process."
    },
    {
      question: "Can I customize the design further?",
      answer: "Currently, we offer pre-designed t-shirt designs that match specific sneaker models. However, if you have a special request for customization, please contact us and we will do our best to assist you."
    },
    {
      question: "What if I receive my T-shirt and it doesn't fit?",
      answer: "We understand that getting the right size can be difficult. If your t-shirt doesn't fit as expected, please contact our customer service team for assistance with the exchange or return process."
    },
    {
      question: "How long does it take to receive my T-shirt?",
      answer: "Our team works diligently to fulfill orders promptly. Generally, we offer a 99% 3-day first delivery service and you can expect to receive your t-shirt within 3-7 business days of placing your order. Please note that shipping times may vary depending on your location."
    },
    {
      question: " Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. However, international orders are shipped via USPS Flat Rate International, taking approximately 16-20 business days."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you will receive a tracking number via email, allowing you to monitor the progress of your delivery."
    },
    {
      question: "How can I contact customer support?",
      answer: `Our customer support team is always ready to assist you with any questions or concerns you may have. You can get in touch with us by sending an email to {{email}} or by filling out the contact form on our website. We make it our top priority to respond to all inquiries promptly.`,
    }
  ];

  const targets = [
    { key: "email", href: "mailto:support@matchmytees.com", text: "support@matchmytees.com" },
  ];

  return (
    <main>
      <Breadcrumb
        title={"Home > Support"}
      />

      <div className="my-container flex max-md:flex-col gap-20 md:gap-10 xl:gap-32 my-6 md:my-10 xl:my-14 lg:p-[60px]">
        <div className="w-full">
          <PageHeader title={'Contact us'} />

          <form onSubmit={onSubmit}
            className="w-full flex flex-col max-md:items-center gap-10 py-12"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name" className='font-roboto text-base text-sub-work-card md:text-xl'>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white text-black"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email" className='font-roboto text-base text-sub-work-card md:text-xl'>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white text-black"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="phone" className='font-roboto text-base text-sub-work-card md:text-xl'>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white text-black"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="message" className='font-roboto text-base text-sub-work-card md:text-xl'>Message</label>
                <textarea
                  name="message"
                  id='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A6AC] focus:border-transparent bg-white text-black"
                  placeholder="Enter your message"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>

              {successStatus &&
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-roboto font-medium text-sm text-green-400 first-letter:uppercase">Thank you for contacting us. We will contact you soon.</p>
                </div>
              }
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn text-sm md:text-base md:font-medium xl:text-[22px] xl:font-normal bg-orange-primary w-fit hover:bg-orange-primary/80 active:bg-orange-primary/90 border-none text-white px-6 py-3 md:py-3.5 xl:px-8 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </div>
          </form>

          <div className="text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl mt-20">
            <h4 className='font-medium font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[26px] my-3'>Contact Information:</h4>
            <ul className="list-none leading-8">
              <li className="decoration-1">Pippa Technologies Inc</li>
              <li className="decoration-1">
                <a href="mailto:support@matchmytees.com" className="text-blue-600 font-bold">
                  support@matchmytees.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <PageHeader title={'Frequently Asked Questions'} />
          <div className="mt-12 max-md:mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full text-left py-4 px-0 flex justify-between items-center font-medium font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[22px] hover:text-orange-primary focus:outline-none"
                >
                  <span>{index + 1}. {faq.question}</span>
                  <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openIndex === index && (
                  <div className="pb-4 text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-medium">
                    <p dangerouslySetInnerHTML={{ __html: replaceAnchors(faq.answer, targets) }}></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}