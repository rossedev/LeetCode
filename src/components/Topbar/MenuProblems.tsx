import Link from 'next/link';
import React from 'react';
import { BsList } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type MenuProblemsProps = {};

const MenuProblems: React.FC<MenuProblemsProps> = () => {
  return (
    <div className="flex items-center gap-4 flex-1 justify-center">
      <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
        <FaChevronLeft />
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
      >
        <div>
          <BsList />
        </div>
        <p>Problem list</p>
      </Link>
      <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer">
        <FaChevronRight />
      </div>
    </div>
  );
};
export default MenuProblems;
