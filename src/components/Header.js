import { useState } from 'react';
import CustomImage from './CustomImage/CustomImage';

export default function Header({ toggleModal }) {
  return (
    <header className='flex justify-around items-center py-4'>
      <h1 className='font-light text-darkblue'>The Clueless Cook</h1>
      <button className='w-8' onClick={toggleModal}>
        <CustomImage
          src='/images/Hamburger_icon.svg'
          alt='Hamburger icon'
          width={100}
          height={100}
        />
      </button>
    </header>
  );
}
