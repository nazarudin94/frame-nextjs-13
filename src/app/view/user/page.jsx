'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';

const Page = () => {
  const [listUser, setListUser] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`../api/user`);
    const data = await response.json();
    setListUser(data.data);

    // setTopAnime(populerAnime);
  };

  useEffect(() => {
    fetchData();
  }, [listUser]);

  const dataSource = listUser.map((user) => ({
    key: user.id, // Adjust this based on the actual key in your data
    name: user.nama,
    password: user.password,
  }));

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add New
        </button>
      </div>
      <Table dataSource={dataSource} columns={columns} title={'List User'} />
    </>
  );
};

export default Page;
