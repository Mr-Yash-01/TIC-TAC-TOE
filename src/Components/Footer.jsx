import React from 'react';
import { LuFileCode2 } from "react-icons/lu";

const Footer = () => {
  return (
    <div className='flex flex-auto max-h-28 items-end  mt-16 md:text-3xl justify-end gap-2 lg:text-4xl relative transition-transform'>
      <a href="https://github.com/Mr-Yash-01/ProdigyInfoTech/tree/master/PRODIGY_WD_03" target="_blank" rel="noopener noreferrer">
        <LuFileCode2 className='mb-1' />
      </a>
      <a href="https://github.com/Mr-Yash-01/ProdigyInfoTech/tree/master/PRODIGY_WD_03" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all hover:underline">
        Yash Vadukiya
      </a>
    </div>
  );
};

export default Footer;
