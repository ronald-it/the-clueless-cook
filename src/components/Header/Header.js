import { useContext } from 'react';
import HamburgerIcon from '../icons/HamburgerIcon';
import Link from 'next/link';
import { smoothScrollToSection } from '../../utils/smoothScrollToSection';
import { supabase } from '../../utils/createClient';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

export default function Header({ toggleModal }) {
  // Declare useContext variable
  const { authorization, getUser } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    getUser();
    router.push('/');
  };

  return (
    <header className='bg-[#EEEEEE] flex justify-center'>
      <div className='flex px-8 justify-between items-center py-4 w-full max-w-2xl lg:max-w-7xl'>
        <h1 className='font-light text-darkblue'>
          <Link href='/'>The Clueless Cook</Link>
        </h1>
        <button className='w-8 lg:hidden' onClick={toggleModal}>
          <HamburgerIcon />
        </button>
        <nav className='hidden lg:block'>
          <ul className='flex items-center gap-x-10 [&>*]:font-semibold [&>*]:text-gray-700'>
            <Link href='/'>
              <li>Home</li>
            </Link>
            <button onClick={() => smoothScrollToSection('footer')}>
              <li>About</li>
            </button>
            <Link href='/calculator'>
              <li>Calculator</li>
            </Link>
            {!authorization && (
              <Link href='/login'>
                <li>Login</li>
              </Link>
            )}
            {authorization && (
              <button href='/' onClick={handleLogout}>
                <li>Logout</li>
              </button>
            )}
            {!authorization && (
              <Link href='/register'>
                <li className='flex justify-center bg-lightblue text-darkblue font-semibold rounded-md py-2 px-6'>
                  Register
                </li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
