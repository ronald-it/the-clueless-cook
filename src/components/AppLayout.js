'use client';
import Header from './Header';
import NavigationModal from './NavigationModal/NavigationModal';
import Footer from './Footer';
import { useRef, useState } from 'react';
import AuthContextProvider from '../context/AuthContext';

export default function AppLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const footerRef = useRef(null);

  const scrollToFooter = () => {
    toggleModal();
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };
  return (
    <AuthContextProvider>
      <div className='min-h-screen flex flex-col'>
        <Header toggleModal={toggleModal} />
        <NavigationModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          scrollToFooter={scrollToFooter}
        />
        <main className='grow'>{children}</main>
        <Footer ref={footerRef} />
      </div>
    </AuthContextProvider>
  );
}
