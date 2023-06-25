import { authModalState } from '@/atoms/authModalAtom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export function useCloseModal() {
  const setAuthModalState = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false, type: 'login' }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return closeModal;
}
