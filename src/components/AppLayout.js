'use client';
import Header from './Header';
import NavigationModal from './NavigationModal';
import Footer from './Footer';
import { useState } from 'react';

export default function AppLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <Header toggleModal={toggleModal} />
      <NavigationModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <main className='h-full'>{children}</main>
      <Footer />
    </>
  );
}
