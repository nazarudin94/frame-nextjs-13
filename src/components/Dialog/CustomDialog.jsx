import { Button, Modal } from 'antd';
import React from 'react';
import Select from 'react-select';
import FormComponent from '@/components/Form/FormUser';
const Page = ({ isOpen, onClose, fetchData, editId }) => {
  return (
    <Modal
      title="Add New User"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <FormComponent onClose={onClose} fetchData={fetchData} editId={editId} />
    </Modal>
  );
};

export default Page;
