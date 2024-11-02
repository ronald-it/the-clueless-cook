import { useState } from 'react';
import CustomImage from './CustomImage/CustomImage';
import HamburgerIcon from './HamburgerIcon';

export default function Header({ toggleModal }) {
  return (
    <header className='bg-[#EEEEEE] flex justify-center'>
      <div className='flex px-8 justify-between items-center py-4 w-full max-w-2xl lg:max-w-7xl'>
        <h1 className='font-light text-darkblue'>The Clueless Cook</h1>
        <button className='w-8' onClick={toggleModal}>
          <HamburgerIcon/>
        </button>
      </div>
    </header>
  );
}
