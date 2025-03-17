'use client';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '../../utils/createClient';

export default function Login() {
  // Initialize useState
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, toggleError] = useState(false);
  const [loginInProces, toggleLoginInProcess] = useState(false);

  // handle changes in login input
  const handleChange = (event) => {
    const changedFieldName = event.target.name;
    const newValue = event.target.value;

    setLogin({
      ...login,
      [changedFieldName]: newValue,
    });
  };

  // Handle submission of login form
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  // Function to log in the user or notify the user of a wrong combination of username and password
  const handleLogin = async () => {
    toggleLoginInProcess(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: login.email,
      password: login.password,
    });
    if (!error) {
      toggleError(false);
      window.location.href = '/';
    } else {
      toggleError(true);
    }
    toggleLoginInProcess(false);
  };

  return (
    <div className='flex justify-center py-6'>
      <div className='px-8 flex flex-col gap-y-4 sm:gap-y-6 w-full sm:max-w-2xl lg:max-w-7xl text-xs sm:text-sm lg:text-base'>
        <h2 className='text-darkblue'>Login</h2>
        <span>Log into your account down below.</span>
        <form
          className='bg-darkblue text-white p-6 flex flex-col gap-y-2 sm:gap-y-4 lg:gap-y-6 rounded-lg max-w-sm'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              id='email'
              type='email'
              className='rounded-md text-base py-2 text-black px-2'
              onChange={handleChange}
              value={login.email}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              id='password'
              type='password'
              className='rounded-md text-base py-2 text-black px-2'
              onChange={handleChange}
              value={login.password}
            />
          </div>
          <button
            className='bg-lightblue text-darkblue font-semibold rounded-md mt-2 py-2'
            type='submit'
          >
            Login
          </button>
        </form>
        <span>
          No account yet? Register{' '}
          <Link
            href='/register'
            className='font-semibold text-blue-600 visited:text-purple-600 underline'
          >
            here
          </Link>
          .
        </span>
        {loginInProces && (
          <span className='text-darkblue font-semibold'>
            Login is being processed, please wait a moment.
          </span>
        )}
        {error && (
          <span className='text-red-500 font-semibold'>
            Incorrect username or password. Please try again.
          </span>
        )}
      </div>
    </div>
  );
}
