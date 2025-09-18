import Link from 'next/link'
import ImageWithLoader from '../../global/ImageWithLoader'
import TailwindLoader from '../../global/TailwindLoader'

const ProductCard = ({ title, img, productData, productType, isLoading }) => {
    return (
        <Link href={`${isLoading ? '' : `/collection?brand=${productData?.brand.slug}&model=${productData?.model.slug}&sub_model_category=${productData?.sub_model_category.slug}&sneaker=${productData?.slug}&product_type=${productType}&product_colors=&designs`}`}
            className="w-full h-fit flex flex-col gap -1.5 items-center xl:gap -3 group cursor-pointer"
        // onClick={onClick}
        >
            <div className='w-full h-full'>
                <ImageWithLoader
                    src={productData?.sneaker_image}
                    alt={productData?.original_title}
                    className="w-full object-contain group-hover:scale-[1.15] transition-all duration-300 ease-in-out"
                    imgHeight={'h-[122px] sm:h-[250px] md:h-[225px] lg:h-[229px] xl:h-[312px] 2xl:h-[288.8px]'}
                    isLoading={isLoading}
                    type={'sneaker'}
                />
                {/* <img
                    className="w-full h-[186px] object-contain group-hover:scale-[1.15] transition-all duration-300 ease-in-out"
                    src={productData.sneaker_image}
                    alt={productData.title}
                /> */}
            </div>
            {isLoading ? <TailwindLoader height={'h-10 xl:h-[56px]'} /> :
                <p className="font-roboto text-base font-medium text-center capitalize text-[#111] sm:w-[201px] xl:w-[229px] xl:text-xl">{productData?.original_title}</p>
            }
        </Link>)
}

export default ProductCard