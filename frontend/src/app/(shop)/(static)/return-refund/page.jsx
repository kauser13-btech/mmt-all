import PageHeader from "@/components/global/PageHeader"
import Breadcrumb from "@/components/global/Breadcrumb"

import Link from 'next/link'

export const metadata = {
    title: 'Return and Refunds | MatchMyTees',
    description: "Need to return or request a refund? Follow our simple process: contact our support team within 14 days, attach a photo of the item, and we'll handle the rest. Return fees apply. Refunds issued within 2-3 business days. Contact us for more details.",
}

const page = () => {
    return (
        <div>
            <Breadcrumb
                title={"Home > Returns & Refunds"}
            />

            <div className="max-w-[900px] mx-auto max-lg:px-8 flex flex-col gap-6 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px]">
                <PageHeader title={"Returns & Refunds"} />
                <ul className="!list-disc pt-8 text-base font-roboto gap-4 flex flex-col">
                    <li className='max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>To request a return or refund, kindly reach out to our support team within 14 business days of receiving your order.
                    </li>
                    <li className='max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>
                        When making your request, attach a clear photo of the item you wish to return, highlighting any defects, damages, or color discrepancies.
                    </li>
                    <li className='max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>
                        If the received product's color differs from your order, excluding shipping charges, we'll replace or refund it.
                    </li>
                    <li className='max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>
                        Please be aware that return fees, including shipping and handling charges, are the customer's responsibility.
                    </li>
                    <li className='max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>
                        For returns, allow 7-10 business days for processing once tracking information is provided. Refunds will be issued via the original payment method within 2-3 business days.
                    </li>
                </ul>

                <div className="max-sm:text-center md:text-sm xl:text-xl xl:font-medium">
                    For any further inquiries or concerns, feel free to contact our support team at  <Link target='_blank' href='mailto:support@matchmytees.com' className='text-blue-600 underline'>support@matchmytees.com</Link>.
                </div>
            </div>
        </div >
    )
}

export default page