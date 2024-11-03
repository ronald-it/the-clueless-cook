'use client';
import Header from './Header';
import NavigationModal from './NavigationModal/NavigationModal';
import Footer from './Footer';
import { useState } from 'react';

export default function AppLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <Header toggleModal={toggleModal} />
      <NavigationModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
