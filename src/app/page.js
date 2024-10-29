'use client';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReactModal from 'react-modal';
import { useState } from 'react';
import CloseIcon from '../components/CloseIcon';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleModal={toggleModal} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className='h-full p-4'
      >
        <div className='h-full w-full flex justify-center items-center bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light'>
          <button className='absolute top-8 right-8 w-6' onClick={toggleModal}>
            <CloseIcon />
          </button>
          <div className='flex flex-col w-3/4 justify-between items-center [&>*]:w-full [&>*]:flex [&>*]:justify-center [&>*]:mb-4 [&>*]:pb-4 [&>*]:border-b-2 [&>*]:border-white [&>*:last-child]:border-none [&>*:last-child]:m-0 [&>*:last-child]:p-0'>
            <button onClick={toggleModal}>
              <Link href='/'>Home</Link>
            </button>
            <button onClick={toggleModal}>
              <a href='#footer'>About</a>
            </button>
            <span>
              <Link href='/calculator'>Calculator</Link>
            </span>
            <span>
              <Link href='/login'>Login</Link>
            </span>
            <div>
              <span className='w-full flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-1'>
                <Link href='/register'>Register</Link>
              </span>
            </div>
          </div>
        </div>
      </ReactModal>
      <main></main>
      <Footer />
    </>
  );
}
