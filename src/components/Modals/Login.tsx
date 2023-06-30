import { TypeAuthModalState, authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  const handleClick = (type: TypeAuthModalState) => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      return alert('Please fill all fields');
    }

    const currentUser = await signInWithEmailAndPassword(
      inputs.email,
      inputs.password
    );

    try {
      if (!currentUser) return;
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Log in</h3>
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
          placeholder="Enter your email"
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
        {loading ? 'Loading...' : 'Log in'}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick('forgotPassword')}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-300">
        Not Registered?{' '}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick('register')}
        >
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
