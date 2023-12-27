'use server';
import { Table } from 'antd';

const Page = () => {
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 30,
      address: '1234 Street, City',
    },

    // Add more data objects as needed
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Action',
      dataIndex: 'address',
      key: 'address',
    },
    // Add more columns as needed
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default Page;
