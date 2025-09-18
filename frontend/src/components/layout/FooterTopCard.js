import Image from 'next/image';

const FooterTopCard = ({ title, subtitle, img }) => {
  return (
    <div className="flex flex-col w-fit items-center gap-3 md:flex-row md:justify-center">
      <Image className='h-5 w-auto md:h-[30px]' src={img} alt={title} width={100} height={100} />
      <div className="flex flex-col items-center font-roboto max-md:gap-1.5 md:items-start md:gap-1 md:*:leading-none">
        <h2 className='text-black-primary font-medium text-xs md:text-sm xl:text-lg'>{title}</h2>
        <p className='text-[10px] text-black font-normal xl:text-[13px]'>{subtitle}</p>
      </div>
    </div>
  )
}

export default FooterTopCard