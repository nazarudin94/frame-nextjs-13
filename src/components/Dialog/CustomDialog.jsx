import { Dialog, FocusTrap, Fragment, Transition } from '@headlessui/react';
import { Button, Modal } from 'antd';
import React from 'react';
import Select from 'react-select';
import FormComponent from '@/components/Form/FormUser';
const Page = ({ isOpen, onClose }) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <Modal
      title="Add New User"
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <FormComponent onClose={onClose} />
    </Modal>
  );
};

export default Page;
