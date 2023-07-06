import { auth } from '@/firebase/firebase';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type ResetPasswordProps = {};

const ResetPassword: FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success('Sent email successfully', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      });
    }
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <h3 className="text-xl font-medium text-white">Reset password</h3>
      <p className="text-sm text-white">
        Forgotter your password? Enter your e-mail adress
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          placeholder="rose@example.com"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-500 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {sending ? 'Sending...' : 'Reset password'}
      </button>
    </form>
  );
};
export default ResetPassword;
