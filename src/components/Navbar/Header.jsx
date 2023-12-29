'use client';
import { List } from '@phosphor-icons/react';
const Page = () => {
  return (
    <header className="bg-gray-900  text-white  py-4">
      <div className=" mx-auto container px-4">
        <div className="flex gap-x-4 items-center">
          <List size={32} className={`cursor-pointer duration-500 `} />

          <h1
            className={`text-white origin-left font-medium text-xl duration-300 `}
          >
            Annajmutsaqib
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Page;
