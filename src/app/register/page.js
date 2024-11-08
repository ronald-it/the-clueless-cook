'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [registration, setRegistration] = useState({ email: '', username: '', password: '' });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (event) => {
    const changedFieldName = event.target.name;
    const newValue = event.target.value;

    setRegistration({
      ...registration,
      [changedFieldName]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postRegistration();
  };

  const postRegistration = async () => {
    try {
      const response = await axios.post(
        'https://frontend-educational-backend.herokuapp.com/api/auth/signup',
        {
          username: registration.username,
          email: registration.email,
          password: registration.password,
          role: ['user'],
        },
      );
      setSubmissionMessage(response.data.message);
    } catch (error) {
      setSubmissionMessage(error.response.data.message);
    }
  };

  return (
    <div className='flex justify-center py-6'>
      <div className='px-8 flex flex-col gap-y-4 w-full sm:max-w-2xl lg:max-w-7xl text-xs'>
        <h2 className='text-darkblue'>Registration</h2>
        <span>You can register an account down below.</span>
        <form
          className='bg-darkblue text-white p-6 flex flex-col gap-y-2 rounded-lg'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-y-1'>
            <label>Email address</label>
            <input
              name='email'
              type='email'
              className='rounded-md py-2'
              onChange={handleChange}
              value={registration.email}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label>Username</label>
            <input
              name='username'
              type='text'
              className='rounded-md py-2'
              onChange={handleChange}
              value={registration.username}
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label>Password</label>
            <input
              name='password'
              type='password'
              className='rounded-md py-2'
              onChange={handleChange}
              value={registration.password}
            />
          </div>
          <button
            className='bg-lightblue text-darkblue font-semibold rounded-md mt-2 py-2'
            type='submit'
          >
            Register
          </button>
        </form>
        <span>
          Already have an account? Log in{' '}
          <Link
            href='/login'
            className='font-semibold text-blue-600 visited:text-purple-600 underline'
          >
            here
          </Link>
          .
        </span>
        {submissionMessage && <span>{submissionMessage}</span>}
      </div>
    </div>
  );
}
