const SectionTitle = ({ title, subtitle, lightSubtitle = false }) => {
    return (
        <div className='uppercase font-staatliches text-center font-normal text-title-work-card'>
            <h2 className='text-3xl md:tracking-[0.36px] xl:text-4xl leading-normal xl:tracking-[0.051px]'>{title}</h2>
            <h3 className={` ${lightSubtitle ? 'md:w-[452px] mt-3 text-sub-work-card lg:w-full font-roboto text-sm xl:text-xl font-medium'
                : 'text-4xl md:text-[2.5rem] md:tracking-[0.36px] xl:text-[45px] leading-normal xl:tracking-[0.072px]'}`}>
                {subtitle}
            </h3>
        </div>
    )
}

export default SectionTitle