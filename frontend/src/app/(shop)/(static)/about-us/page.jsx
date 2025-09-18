import PageHeader from "@/components/global/PageHeader"
import PageParagraph from "@/components/global/PageParagraph"
import Breadcrumb from "@/components/global/Breadcrumb"

export const metadata = {
    title: 'About Us | MatchMyTees',
    description: "Explore MatchMyTees.com, where fashion meets personal expression. Customize your style with exclusive t-shirt designs and sneakers.",
}

const page = () => {
    return (
        <div>
            <Breadcrumb
                title={"Home > About Us"}
            />

            <div className="my-container flex flex-col gap-10 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px]">

                <PageHeader title={'About Us'} />

                <PageParagraph text={`Welcome to MatchMyTees, where fashion meets personal expression in the most unique ways. Established in 2024, we are an innovative online platform dedicated to revolutionizing the way you showcase your style.`} />
                <PageParagraph text={`We understand that your footwear makes a statement, and we're here to help you enhance it. Our platform empowers you to explore, create, and celebrate individuality that embodies the latest trends or timeless elegance through meticulously crafted designs.`} />
                <PageParagraph text={`Please explore our website, search for your favorite sneakers, and discover a world of possibilities as you match them with our exclusive t-shirt designs. Customize colors, experiment with styles, and let your creativity shine. Join us in redefining the intersection of sneakers and fashion at MatchMyTees – where your style takes center stage.`} />

                <div className="text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl">
                    <h4 className='font-medium font-roboto text-base text-title-work-card max-md:text-center md:font-medium xl:text-[26px] my-3'>Contact Information:</h4>
                    <ul className="list-none leading-8">
                        <li className="decoration-1">Pippa Technologies Inc</li>
                        <li className="decoration-1"><a href="mailto:support@matchmytees.com" className="text-blue-600 font-bold">support@matchmytees.com</a></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default page