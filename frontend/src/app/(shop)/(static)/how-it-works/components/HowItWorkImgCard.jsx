import React from 'react'

const HowItWorkImgCard = ({ img, title, desc, flexReverse }) => {
    return (
        <div className={`flex items-center flex-col md:flex-row md:gap-[66px] xl:justify-between w-full gap-4 ${flexReverse}`}>
            <img src={img} className="max-md:rounded-t-lg w-[288px] md:w-[322px] xl:w-[796px]" />
            <div className="flex items-center justify-center xl:w-full">
                <div className="flex items-center flex-col gap-1.5 md:gap-2 xl:gap-4 w-[234px] md:w-[300px] xl:w-[450px] 2xl:w-[500px] text-center">
                    <h2 className='text-title-work-card text-2xl font-staatliches md:tracking-[0.36px] xl:text-[32px] xl:leading-[50px]'>{title}</h2>
                    <p className='text-sub-work-card text-xl leading-6 font-roboto md:max-w-[300px] xl:max-w-[500px] md:font-medium xl:text-2xl'
                    dangerouslySetInnerHTML={{ __html: desc }}
                    />
                </div>
            </div>
        </div >
    )
}

export default HowItWorkImgCard