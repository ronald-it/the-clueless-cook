import ReactModal from 'react-modal';
import CloseIcon from './CloseIcon';
import Link from 'next/link';

export default function NavigationModal({isModalOpen, toggleModal}) {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className='h-full flex justify-center items-center p-6'
      style={{ overlay: { zIndex: 9999 } }}
    >
      <div className='relative h-full max-h-[30rem] w-full max-w-md flex justify-center items-center bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light'>
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
  );
}
