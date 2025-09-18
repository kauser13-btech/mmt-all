import PageHeader from "@/components/global/PageHeader"
import PageParagraph from "@/components/global/PageParagraph"
import Breadcrumb from "@/components/global/Breadcrumb"

export const metadata = {
    title: 'Shipping | MatchMyTees',
    description: "Experience efficient shipping with MatchMyTees! Enjoy prompt delivery in 4-7 business days via trusted carriers like USPS, UPS, or FedEx. Rest assured, we refund shipping costs for delays and replace lost orders promptly.",
}

const page = () => {
    return (
        <div>
            <Breadcrumb
                title={"Home > Shipping"}
            />

            <div className="my-container flex flex-col gap-10 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px]">
                <PageHeader title={'Shipping'} />
                <PageParagraph text={`Our objective is to ensure the prompt delivery of your orders within a timeframe of 3-7 business days. We select between reputable carriers such as USPS, UPS, or FedEx, tailoring the choice to your geographical location to optimize delivery speed. Should any unforeseen delays occur, we are committed to refunding your shipping costs accordingly. In the unlikely event of your order being lost during transit, we pledge to promptly replace it at no additional cost to you.`} />
                <PageParagraph text={`Please be advised that at present, we are regrettably unable to accommodate requests for specific carriers or expedited overnight shipping services. For international orders, we utilize USPS Flat Rate International shipping, which typically entails a delivery timeframe of approximately 16-20 business days. `} />


            </div>
        </div>
    )
}

export default page