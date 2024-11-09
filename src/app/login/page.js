'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  // Declare useContext variable
  const { userLogin } = useContext(AuthContext);

  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, toggleError] = useState(false);

  const handleChange = (event) => {
    const changedFieldName = event.target.name;
    const newValue = event.target.value;

    setLogin({
      ...login,
      [changedFieldName]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postLogin();
  };

  const postLogin = async () => {
    try {
      const response = await axios.post(
        'https://frontend-educational-backend.herokuapp.com/api/auth/signin',
        {
          username: login.username,
          password: login.password,
        },
      );
      userLogin(response.data.accessToken);
      toggleError(false);
    } catch (error) {
      toggleError(true);
    }
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
            <label htmlFor='username'>Username</label>
            <input
              name='username'
              id='username'
              type='text'
              className='rounded-md py-2 text-black px-2'
              onChange={handleChange}
              value={login.username}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              id='password'
              type='password'
              className='rounded-md py-2 text-black px-2'
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
        {error && (
          <span className='text-red-500 font-semibold'>
            Incorrect username or password. Please try again.
          </span>
        )}
      </div>
    </div>
  );
}
