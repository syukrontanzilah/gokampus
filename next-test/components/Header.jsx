import React from 'react'

const Header = ({title}) => {  
  return (
    <div className={`flex bg-white h-16 fixed w-full xl:w-[450px] shadow-sm items-center justify-center font-bold`}>
      {title}
    </div>
  )
}

export default Header