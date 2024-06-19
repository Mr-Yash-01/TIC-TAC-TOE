import React from 'react'
import { TbTicTac } from "react-icons/tb";

const Header = () => {
  return (
    <div className='flex flex-auto text-5xl max-h-28 '>
      <TbTicTac className='min-h-12 min-w-12 md:min-h-20 md:min-w-20 lg:min-h-28 lg:min-w-28'/>
    </div>
  )
}

export default Header