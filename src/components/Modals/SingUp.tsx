import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type SingUpProps = {};

const SingUp: React.FC<SingUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'login' }));
  };

  return (
    <div>
      {' '}
      <form className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-medium text-white">Register</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="rose@example.com"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-500 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Rose"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-500 text-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*****"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-500 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange.s"
        >
          Register
        </button>

        <div className="text-sm font-medium text-gray-300">
          Already have an account?{' '}
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={handleClick}
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};
export default SingUp;
