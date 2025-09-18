import PageHeader from "@/components/global/PageHeader"
import PageParagraph from "@/components/global/PageParagraph"
import Breadcrumb from "@/components/global/Breadcrumb"
import PageSubHead from '@/components/global/PageSubHead'

const page = () => {
    const bgUrl = 'size-chart.png'
    return (
        <div>
            <Breadcrumb
                title={"Home > Size Chart"}
            />

            <div className='my-container !max-w-[1100px] flex flex-col gap-6 md:gap-8 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px] lg:sha dow-[0px_0px_4px_rgba(0,0,0,.25)] lg:rounded-[15px]'>
                <PageHeader title={'Size Chart'} />
                <div className="pt-8">
                    <PageParagraph text={`Please use the following charts to determine the appropriate size in inches for adults and kids.`} />
                </div>
                <div className='flex flex-col gap-6'>
                    <PageSubHead title={'Adult Size Chart:'} />
                    <PageParagraph text={`We use unisex All I Care About Riding Horse for adult tees. The T-shirt has a relaxed fit and a standard length. The fabric is stretchy and comfortable, allowing for easy movement. It weighs 4 oz.`} />
                    <div className="w-full text-slate-500 border border-[#6B6B6B] rounded-md text-sm md:text-base md:font-medium xl:text-xl">
                        <div className='flex text-center border-b border-[#6B6B6B] text-slate-950'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">SIZE</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">LENGTH (Inch)</div>
                            <div className="w-full py-1.5">CHEST (Inch)</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex X-Small</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">27</div>
                            <div className="w-full py-1.5">31 - 34</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex Small</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">28</div>
                            <div className="w-full py-1.5">34 - 37</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex Medium</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">29</div>
                            <div className="w-full py-1.5">38 - 41</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex Large</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">30</div>
                            <div className="w-full py-1.5">42 - 45</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex XL</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">31</div>
                            <div className="w-full py-1.5">46 - 49</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex 2X-Large</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">32</div>
                            <div className="w-full py-1.5">50 - 53</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex 3X Large</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">33</div>
                            <div className="w-full py-1.5">54 - 57</div>
                        </div>
                        <div className='flex text-center border-b border-[#6B6B6B]'>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex 4X-Large</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">34</div>
                            <div className="w-full py-1.5">58 - 61</div>
                        </div>
                        <div className='flex text-center '>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">Adult Unisex 5X-Large</div>
                            <div className="border-r w-full border-[#6B6B6B] py-1.5">35</div>
                            <div className="w-full py-1.5">62- 65</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page