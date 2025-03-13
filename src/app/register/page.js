'use client';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '../../utils/createClient';

export default function Register() {
  // Initialize useState
  const [registration, setRegistration] = useState({ email: '', password: '' });
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [error, toggleError] = useState(false);
  const [registrationInProces, toggleRegistrationInProcess] = useState(false);

  // handle changes in registration input
  const handleChange = (event) => {
    const changedFieldName = event.target.name;
    const newValue = event.target.value;

    setRegistration({
      ...registration,
      [changedFieldName]: newValue,
    });
  };

  // Handle submission of registration form
  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration();
  };
    
  // Function to register the user or notify the user of an error during registration
  const handleRegistration = async () => {
    toggleRegistrationInProcess(true);
    const { error } = await supabase.auth.signUp({
      email: registration.email,
      password: registration.password,
    })
    if (!error) {
      toggleError(false)
      setSubmissionMessage("Registration successful!");
    } else {
      toggleError(true)
      setSubmissionMessage("Registration failed! Please try again or check your details.");
    }
    toggleRegistrationInProcess(false);
  }
  

  return (
    <div className='flex justify-center py-6'>
      <div className='px-8 flex flex-col gap-y-4 sm:gap-y-6 w-full sm:max-w-2xl lg:max-w-7xl text-xs sm:text-sm lg:text-base'>
        <h2 className='text-darkblue'>Registration</h2>
        <span>Register an account down below.</span>
        <form
          className='bg-darkblue text-white p-6 flex flex-col gap-y-2 sm:gap-y-4 lg:gap-y-6 rounded-lg max-w-sm'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='email'>Email address</label>
            <input
              name='email'
              id='email'
              type='email'
              className='rounded-md text-base py-2 text-black px-2'
              onChange={handleChange}
              value={registration.email}
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
              value={registration.password}
              minLength={6}
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
        {registrationInProces && (
          <span className='text-darkblue font-semibold'>
            Registration is being processed, please wait a moment.
          </span>
        )}
        {submissionMessage && (
          <span className={`${error ? 'text-red-500' : 'text-green-500'} font-semibold`}>
            {submissionMessage}
          </span>
        )}
      </div>
    </div>
  );
}
