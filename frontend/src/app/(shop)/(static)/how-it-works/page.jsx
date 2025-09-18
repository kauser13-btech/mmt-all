import PageHeader from "@/components/global/PageHeader"
import HowItWorkImgCard from "./components/HowItWorkImgCard"
import StepCard from "./components/StepCard";

export const metadata = {
    title: 'How It Works | MatchMyTees',
    description: 'Find the perfect hoodies & T-shirts  to match your sneakers from our extensive 80K+ collection. We guarantee a seamless shopping with fast delivery & 100% color match.',
}

const page = () => {
    return (
        <div className="my-container flex flex-col items-center gap-8 md:gap-6 xl:gap-8 my-8 md:my-16 xl:my-[87px]">
            <div className="flex flex-col items-center gap-5 md:gap-6 xl:gap-10">

                <PageHeader title={'How It Works'} />
                <div className="flex flex-col  md:w-full">
                    <div className="flex items-center gap-6 max-sm:justify-center max-sm:flex-wrap md:gap-12 xl:gap-[72px] w-fit">
                        <StepCard stepNumber={1} title={'Locate your sneakers'} />
                        <StepCard stepNumber={2} title={'MATCH THE DESIGN & COLOR'} />
                        <StepCard stepNumber={3} title={'SEAMLESS STYLE DELIVERED'} />
                    </div>
                </div>
            </div>
            <hr className="max-md:hidden fill-[#A9A9A9] min-w-full" />
            <div className="flex flex-col gap-6 md:gap-[60px] xl:gap-[130px] xl:w-full md:mt-6">

                <HowItWorkImgCard flexReverse={'md:flex-row-reverse'} img={'/images/how-it-works/locate-your-sneakers.png'} title={'Locate your sneakers'} desc={'Explore our vast collection of 80k sneakers from <strong>"Sneakers Gallery"</strong> to find the perfect pair for your t-shirts, hoodies, and more.'} />
                <HowItWorkImgCard img={'/images/how-it-works/match-the-design.png'} title={'MATCH THE DESIGN & COLOR'} desc={"Find a design that complements your kicks and explore our range of t-shirts, hoodies, and more to complete your ensemble."} />

                <HowItWorkImgCard flexReverse={'md:flex-row-reverse'} img={'/images/how-it-works/seamless-style.png'} title={'SEAMLESS STYLE DELIVERED'} desc={"Rest assured, we'll swiftly deliver the exact product you've chosen right to your doorstep. 100% color match guaranteed."} />
            </div>
        </div>
    )
}

export default page