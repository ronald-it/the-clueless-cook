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
      className='relative w-[85%] max-w-sm h-[75vh] max-h-[28rem] p-6 bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light flex justify-center items-center'
    >
      <button className='absolute top-4 right-4 w-6' onClick={toggleModal}>
        <CloseIcon />
      </button>
      <div className='flex flex-col w-3/4 justify-between items-center [&>*]:w-full [&>*]:flex [&>*]:justify-center [&>*]:mb-4 [&>*]:pb-4 [&>*]:border-b-2 [&>*]:border-white [&>*:last-child]:border-none [&>*:last-child]:m-0 [&>*:last-child]:p-0'>
        <button onClick={toggleModal}>
          <Link href='/'>Home</Link>
        </button>
        <button onClick={toggleModal}>
          <a href='#footer'>About</a>
        </button>
        <button onClick={toggleModal}>
          <Link href='/calculator'>Calculator</Link>
        </button>
        {!authorization && (
          <button onClick={toggleModal}>
            <Link href='/login'>Login</Link>
          </button>
        )}
        {authorization && (
          <button
            onClick={() => {
              toggleModal();
              userLogout();
            }}
          >
            <Link href='/'>Logout</Link>
          </button>
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
