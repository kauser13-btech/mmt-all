import { ChevronDown } from "lucide-react";
import ProductDescription from "./ProductDescription";
import FAQ from "./FAQ";


export default function ProductDetailsTab({ data, customClass = "" }) {
  return (
    <div className={`flex flex-col gap-8 xl:gap-16 w-full mt-0 ${customClass}`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h3 className="font-normal font-staatliches uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
            Product Description
          </h3>
          <p className="flex flex-row relative px-5 items-end font-light text-gray-500 text-sm">Scroll for more info<ChevronDown className="ml-2 animate-bounce" size={16} /></p>

        </div>
        <ProductDescription data={data} />
      </div>

      <hr className="border-t border-gray-200" />

      <div className="flex flex-col gap-4">
        <h3 className="font-normal font-staatliches uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
          SHIPPING & RETURNS POLICY</h3>
        <p className="text-base text-black flex flex-col gap-5">
          <span>We are committed to delivering your order on time to ensure customer satisfaction. We offer a 99% 3-day first delivery service and most of our orders are delivered within 3-7 working days. If the order is not delivered within this time frame, we assure you that we will refund your shipping cost in full. Our shipping methods are tailored to your location, and we use reliable carriers such as USPS, UPS, and FedEx to ensure your order is delivered efficiently and reliably.</span>
          <span>We understand the importance of your shipments and would like to assure you that in the unlikely event of a lost or stolen shipment, we will provide a complimentary replacement with free shipping as part of our commitment to excellent service. However, please note that we are currently unable to accommodate specific carrier requests or offer overnight shipping options.</span>
          <span>At MatchMyTees, we value transparency and customer satisfaction. Our return and refund policy is straightforward, and we offer a 14-day money-back guarantee with no questions asked. In addition, we are happy to facilitate hassle-free exchanges at no additional cost.</span>
          <span>If you need any assistance or have inquiries regarding shipping, returns, or exchanges, our dedicated support team is readily accessible via email at <a href="mailto:support@matchmytees.com" className="text-blue-600 font-bold">support@matchmytees.com</a>.</span>
        </p>
      </div>

      <hr className="border-t border-gray-200" />

      <div className="flex flex-col gap-4">
        <h3 className="font-normal font-staatliches uppercase text-xl md:tracking-[-0.54px] xl:text-2xl xl:tracking-normal">
          frequently asked question
        </h3>
        <FAQ data={data} />
      </div>
    </div >
  );
};
