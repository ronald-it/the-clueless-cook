'use client';
import Header from '../Header/Header';
import NavigationModal from '../NavigationModal/NavigationModal';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import AuthContextProvider from '../../context/AuthContext';

export default function AppLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <AuthContextProvider>
      <div className='min-h-screen flex flex-col'>
        <Header toggleModal={toggleModal} />
        <NavigationModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
        <main className='grow'>{children}</main>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}
