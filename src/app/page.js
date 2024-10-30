'use client';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReactModal from 'react-modal';
import { useState } from 'react';
import CloseIcon from '../components/CloseIcon';
import CustomImage from '../components/CustomImage/CustomImage';
import ArrowRightIcon from '../components/ArrowRightIcon';
import RecipeCard from '../components/RecipeCard';
import Slider from '../components/Slider/Slider';

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
      <main>
        <section className='relative'>
          <CustomImage
            src='images/hero-image.jpg'
            alt='Hero image'
            className='w-full h-96 object-cover'
            width={100}
            height={100}
          />
          <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 [&>*]:text-white [&>*:last-child]:text-darkblue [&>*]:text-nowrap'>
            <h2>Delicious Recipes.</h2>
            <h2 className='font-light'>Daily Updated</h2>
            <button className='mt-2 bg-lightblue pl-2 pr-4 py-1 rounded-md text-xs font-semibold flex items-center'>
              <span className='mr-1 py-1.5'>Find Recipes</span>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        </section>
        <section className='-mt-16 relative'>
          <Slider />
        </section>
      </main>
      <Footer />
    </>
  );
}
