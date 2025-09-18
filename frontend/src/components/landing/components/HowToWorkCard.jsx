import Image from 'next/image'

const HowToWorkCard = ({ img, title, desc }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 md:gap-6 text-center w-full lg:w-[300px] xl:w-[350px] 2xl:w-[380px]">
            <div className="flex flex-col items-center gap-4 md:gap-11">
                <Image width={100} height={100} className='size-12 md:size-[70px] xl:size-[90px]' src={img} alt={title} />
                <h2 className='text-title-work-card text-2xl font-staatliches md:tracking-[0.36px] xl:text-[32px] xl:leading-[50px]'>{title}</h2>
            </div>
            <p className='text-sub-work-card text-xl leading-6 font-roboto md:max-w-[200px] xl:max-w-[373px] md:font-medium xl:text-2xl'>{desc}</p>
        </div>)
}

export default HowToWorkCard