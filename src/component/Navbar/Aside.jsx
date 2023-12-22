'use client';
import { List } from '@phosphor-icons/react';

import { useState } from 'react';
const Page = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Dashboard' },
    { title: 'Data Siswa' },
    { title: 'Data Guru' },
  ];
  return (
    <>
      <aside class="flex bg-gray-800 text-gray-300 w-64 flex-shrink-0">
        <div className="flex">
          <div className={`w-64 bg-slate-800 p-5 pt-8 duration-300 relative`}>
            {/* <button
              type="button"
              className="absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-cyan-50"
              onClick={() => {
                setOpen(!open);
              }}
            >
              CX
            </button> */}

            <ul className="pt-2">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-light-white"
                >
                  <List size={32} className={`cursor-pointer duration-500`} />
                  <span
                    className={`${!open && 'hidden'} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      {/* <aside
        id="sidebar-multi-level-sidebar"
        className=" text-gray-300 w-64 flex-shrink-0"
        aria-label="Sidebar"
      >
        <div className="flex">
          <div
            className={`${
              open ? 'w-64' : 'w-20'
            } h-screen bg-slate-800 p-5 pt-8 duration-300 relative`}
          >
            <button
              type="button"
              className="absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-cyan-50"
              onClick={() => {
                setOpen(!open);
              }}
            >
              CX
            </button>
            <div className="flex gap-x-4 items-center">
              <List
                size={32}
                className={`cursor-pointer duration-500 ${
                  open && 'rotate-[360deg]'
                }`}
              />

              <h1
                className={`text-white origin-left font-medium text-xl duration-300 ${
                  !open && 'scale-0'
                }`}
              >
                Annajmutsaqib
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-light-white"
                >
                  <List size={32} className={`cursor-pointer duration-500`} />
                  <span
                    className={`${!open && 'hidden'} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-7 text-2xl flex-1 h-screen"></div>
        </div>
      </aside> */}
    </>
  );
};

export default Page;
