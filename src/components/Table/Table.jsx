import { Table } from 'antd';

const Page = ({ dataSource, columns, title }) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      title={() => title}
      size="small"
    />
  );
};

export default Page;
