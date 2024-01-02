'use client';

import Swal from 'sweetalert2';
import Table from '@/components/Table/Table';
import { useEffect, useState, Fragment } from 'react';
import CustomDialog from '@/components/Dialog/CustomDialog';

const Page = () => {
  const [listUser, setListUser] = useState([]);
  const [editDataId, setEditDataId] = useState('');

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`../api/user`, {
        method: 'POST',
      });
      const data = await response.json();
      setListUser(data.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleadd = () => {
    setEditDataId('');
    openModal();
  };
  const handleEdit = async (id) => {
    setEditDataId(id);
    openModal();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataSource = listUser.map((user) => ({
    key: user.id, // Adjust this based on the actual key in your data
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    password: user.password,
    status: user.status,
  }));

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'First name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        let status = record.status;

        return status === '1' ? 'active' : 'nonactive';
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <span>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => handleEdit(record.key)}
          >
            Edit
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <>
        <div>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleadd}
          >
            Add New
          </button>
        </div>
        <Table dataSource={dataSource} columns={columns} title={'List User'} />
      </>
      <CustomDialog
        isOpen={isOpen}
        onClose={closeModal}
        fetchData={fetchData}
        editId={editDataId}
      />
    </>
  );
};

export default Page;
