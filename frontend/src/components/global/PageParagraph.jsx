const PageParagraph = ({ text }) => {
  return (
    <div className='text-base font-roboto max-sm:text-center md:text-sm xl:text-xl text-slate-600 font-normal'
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default PageParagraph