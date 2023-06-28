import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type SingUpProps = {};

const FORM_INITIAL = {
  email: '',
  displayName: '',
  password: ''
};

const SingUp: React.FC<SingUpProps> = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState(FORM_INITIAL);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'login' }));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.displayName || !inputs.password) {
      return alert('Please fill all fields');
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Email
          </label>
          <input
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
