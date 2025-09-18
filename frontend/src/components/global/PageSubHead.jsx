import React from 'react'

const PageSubHead = ({ title, customClass }) => {
  return (
    <h4 className={' text-slate-950 font-bold font-roboto text-base max-md:text-center md:font-medium xl:text-[22px] ' + customClass}>{title}</h4>
  )
}

export default PageSubHead