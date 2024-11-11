import ReactModal from 'react-modal';
import CloseIcon from '../CloseIcon';
import Link from 'next/link';
import styles from './NavigationModal.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function NavigationModal({ isModalOpen, toggleModal }) {
  const { authorization, userLogout } = useContext(AuthContext);
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      closeTimeoutMS={300}
      overlayClassName={{
        base: styles.customOverlay,
        afterOpen: styles.customOverlayAfterOpen,
        beforeClose: styles.customOverlayBeforeClose,
      }}
      className='relative w-[85%] max-w-xs h-[75vh] max-h-[24rem] py-6 px-10 bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light flex justify-center items-center focus:outline-none'
    >
      <button className='absolute top-4 right-4 w-6' onClick={toggleModal}>
        <CloseIcon />
      </button>
      <div className='flex flex-col h-full w-full justify-between items-center [&>*]:w-full [&>*]:flex [&>*]:justify-center'>
        <button onClick={toggleModal}>
          <Link href='/'>Home</Link>
        </button>
        <span className='border-[0.05rem] border-white'></span>
        <button onClick={toggleModal}>
          <a href='#footer'>About</a>
        </button>
        <span className='border-[0.05rem] border-white'></span>
        <button onClick={toggleModal}>
          <Link href='/calculator'>Calculator</Link>
        </button>
        <span className='border-[0.05rem] border-white'></span>
        {!authorization && (
          <>
            <button onClick={toggleModal}>
              <Link href='/login'>Login</Link>
            </button>
            <span className='border-[0.05rem] border-white'></span>
          </>
        )}
        {authorization && (
          <>
            <button
              onClick={() => {
                toggleModal();
                setTimeout(() => {
                  userLogout();
                }, 300);
              }}
            >
              <Link href='/'>Logout</Link>
            </button>
            <span className='border-[0.05rem] border-white'></span>
          </>
        )}
        {!authorization && (
          <button onClick={toggleModal}>
            <span className='w-full flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-1'>
              <Link href='/register'>Register</Link>
            </span>
          </button>
        )}
      </div>
    </ReactModal>
  );
}
