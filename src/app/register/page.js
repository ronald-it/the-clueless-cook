import Link from 'next/link';

export default function Register() {
  return (
    <div className='flex justify-center py-6'>
      <div className='px-8 flex flex-col gap-y-4 w-full sm:max-w-2xl lg:max-w-7xl text-xs'>
        <h2>Registration</h2>
        <span>You can register an account down below.</span>
        <form className='bg-darkblue text-white p-6 flex flex-col gap-y-2 rounded-lg'>
          <div className='flex flex-col gap-y-1'>
            <label>Email address</label>
            <input type='email' className='rounded-md py-2' />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label>Username</label>
            <input type='text' className='rounded-md py-2' />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label>Password</label>
            <input type='password' className='rounded-md py-2' />
          </div>
          <button className='bg-lightblue text-darkblue font-semibold rounded-md mt-2 py-2'>
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
      </div>
    </div>
  );
}
