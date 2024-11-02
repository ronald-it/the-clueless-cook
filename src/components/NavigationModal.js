import ReactModal from 'react-modal';
import CloseIcon from './CloseIcon';
import Link from 'next/link';

export default function NavigationModal({ isModalOpen, toggleModal }) {
  return (
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="relative w-[85%] max-w-sm h-[75vh] max-h-96 p-6 bg-darkblue rounded-xl [&>*]:text-white [&>*]:text-xl [&>*]:font-light flex justify-center items-center"
        style={{ overlay: { zIndex: 9999 } }}
      >
        <button className="absolute top-4 right-4 w-6" onClick={toggleModal}>
          <CloseIcon />
        </button>
        <div className="flex flex-col w-3/4 justify-between items-center [&>*]:w-full [&>*]:flex [&>*]:justify-center [&>*]:mb-4 [&>*]:pb-4 [&>*]:border-b-2 [&>*]:border-white [&>*:last-child]:border-none [&>*:last-child]:m-0 [&>*:last-child]:p-0">
          <button onClick={toggleModal}>
            <Link href="/">Home</Link>
          </button>
          <button onClick={toggleModal}>
            <a href="#footer">About</a>
          </button>
          <span>
            <Link href="/calculator">Calculator</Link>
          </span>
          <span>
            <Link href="/login">Login</Link>
          </span>
          <div>
            <span className="w-full flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-1">
              <Link href="/register">Register</Link>
            </span>
          </div>
        </div>
      </ReactModal>
  );
}
