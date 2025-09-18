
export default function Service() {
    return (
        <div className="my-container flex flex-col gap-5 my-10">
            <div className="flex flex-wrap flex-row -mx-4 text-center gap-12">
                <div className="flex-grow hover:scale-[1.025] transition-transform duration-300 hover:shadow-[1px_1px_100px_0px_#ddd]">
                    <div className="py-8 px-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out">
                        <div className="inline-block text-gray-900 mb-4">
                            <img className="h-14 w-auto" src="/images/footer/footerIcon1.svg" alt="Icon 1" />
                        </div>
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Free Shipping</h3>
                        <p className="text-gray-500">Free Shipping USA & CA</p>
                    </div>
                </div>
                {/* <div className="flex-grow wow fadeInUp hover:shadow-xl" data-wow-duration="1s" style={{visibility: 'visible',animationDuration: '1s',animationName: 'fadeInUp'}}> */}
                <div className="flex-grow hover:scale-[1.025] transition-transform duration-300 hover:shadow-[1px_1px_100px_0px_#ddd]">
                    <div className="py-8 px-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out">
                        <div className="inline-block text-gray-900 mb-4">
                            <img className="h-14 w-auto" src="/images/footer/footerIcon2.svg" alt="Icon 2" />
                        </div>
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Secure Payment</h3>
                        <p className="text-gray-500">100% Secure Guarantee</p>
                    </div>
                </div>
                <div className="flex-grow hover:scale-[1.025] transition-transform duration-300 hover:shadow-[1px_1px_100px_0px_#ddd]">
                    <div className="py-8 px-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out">
                        <div className="inline-block text-gray-900 mb-4">
                            <img className="h-14 w-auto" src="/images/footer/footerIcon3.svg" alt="Icon 3" />
                        </div>
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Easy Process</h3>
                        <p className="text-gray-500">Order in 2 Minutes</p>
                    </div>
                </div>
                <div className="flex-grow hover:scale-[1.025] transition-transform duration-300 hover:shadow-[1px_1px_100px_0px_#ddd]">
                    <div className="py-8 px-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out">
                        <div className="inline-block text-gray-900 mb-4">
                            <img className="h-14 w-auto" src="/images/footer/footerIcon4.svg" alt="Icon 4" />
                        </div>
                        <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Special Support</h3>
                        <p className="text-gray-500">24/7 Dedicated Support</p>
                    </div>
                </div>
            </div>
        </div>

    );
};