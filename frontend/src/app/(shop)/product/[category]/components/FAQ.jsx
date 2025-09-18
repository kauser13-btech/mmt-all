export default function FAQ({ data }) {
  return (
    <ul className="flex flex-col gap-6 text-base text-sub-work-card font-roboto font-normal leading-[23px] text-left">
      <li className="text-lg font-medium">
        1. How do I place an order for a sneaker match{" "}
        {data.type}?
      </li>
      <li className="text-base">
        To find matching {data.type} designs for your sneaker
        model, simply visit our website and enter the name or model number of
        your sneakers. We'll present you with a wide range of styles and colors
        to choose from. Once you have selected your preferred design, choose the
        size and quality you want and complete the checkout process.
      </li>
      <li className="text-lg font-medium">
        2. Can I customize the design further?
      </li>
      <li className="text-base">
        Currently, we offer pre-designed {data.type} designs that
        match specific sneaker models. However, if you have a special request
        for customization, please contact us and we will do our best to assist
        you.
      </li>
      <li className="text-lg font-medium">
        3. What if I receive my {data.type} and it doesn't fit?
      </li>
      <li className="text-base">
        We understand that getting the right size can be difficult. If your{" "}
        {data.type} doesn't fit as expected, please contact our
        customer service team for assistance with the exchange or return
        process.
      </li>
      <li className="text-lg font-medium">
        4. How long does it take to receive my {data.type}?
      </li>
      <li className="text-base">
        Our team works diligently to fulfill orders promptly. Generally, we
        offer a 99% 3-day first delivery service and you can expect to receive
        your {data.type} within 3-7 business days of placing your
        order. Please note that shipping times may vary depending on your
        location.
      </li>
      <li className="text-lg font-medium">
        5. Do you offer international shipping?
      </li>
      <li className="text-base">
        Yes, we offer international shipping to most countries. However,
        international orders are shipped via USPS Flat Rate International,
        taking approximately 16-20 business days. You can find our gift cards in
        the "Gifts" section of our website.
      </li>

      <li className="text-lg font-medium">6. How can I track my order?</li>
      <li className="text-base">
        Once your order has been shipped, you will receive a tracking number via
        email, allowing you to monitor the progress of your delivery.
      </li>

      <li className="text-lg font-medium">
        7. How can I contact customer support?
      </li>
      <li className="text-base">
        Our customer support team is always ready to assist you with any
        questions or concerns you may have. You can get in touch with us by
        sending an email to{" "}
        <a
          href="mailto:support@matchmytees.com"
          className="text-blue-600 font-bold"
        >
          support@matchmytees.com
        </a>{" "}
        or by filling out the contact form on our website. We make it our top
        priority to respond to all inquiries promptly.
      </li>
    </ul>
  );
};