
const StepCard = ({ stepNumber, title }) => {
    return (
            <div className="flex items-center font-staatliches gap-2 md:gap-3 xl:gap-4 text-title-work-card">
                <div className="relative flex items-center justify-center">
                    <img src='/images/how-it-works/step-bg.png' className='min-w-10 max-w-10 min-h-10 max-h-10 md:min-w-[55px] md:max-w-[55px] md:min-h-[55px] md:max-h-[55px] xl:min-w-[71px] xl:max-w-[71px] xl:min-h-[71px] xl:max-h-[71px]' />
                    <p className='absolute font-normal text-[11px] text-sm xl:text-xl'>Step {stepNumber}</p>
                </div>
                <h4 className="text-sm xl:text-xl w-[90px] md:w-[117px]">{title}</h4>
            </div>
    )
}

export default StepCard