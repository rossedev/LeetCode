import { auth } from '@/firebase/firebase';
import { FC } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

const Logout: FC = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogOut = () => {
    signOut();
  };

  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogOut}
    >
      <FiLogOut />
    </button>
  );
};
export default Logout;
