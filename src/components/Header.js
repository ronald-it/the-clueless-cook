import { useState } from 'react';
import CustomImage from './CustomImage/CustomImage';
import HamburgerIcon from './HamburgerIcon';
import Link from 'next/link';

export default function Header({ toggleModal }) {
  return (
    <header className='bg-[#EEEEEE] flex justify-center'>
      <div className='flex px-8 justify-between items-center py-4 w-full max-w-2xl lg:max-w-7xl'>
        <h1 className='font-light text-darkblue'>The Clueless Cook</h1>
        <button className='w-8 lg:hidden' onClick={toggleModal}>
          <HamburgerIcon />
        </button>
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-x-10 [&>*]:font-semibold [&>*]:text-gray-700'>
            <Link href='/'>
              <li>Home</li>
            </Link>
            <a href='#footer'>
              <li>About</li>
            </a>
            <Link href='/calculator'>
              <li>Calculator</li>
            </Link>
            <Link href='/login'>
              <li>Login</li>
            </Link>
            <Link href='/register'>
              <li className='flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-2 px-6'>Register</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
