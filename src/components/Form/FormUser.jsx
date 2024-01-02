import React, { useEffect, useState } from 'react';

import { Field, Formik, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import Switch from 'react-switch';
import Swal from 'sweetalert2';

const FormComponent = ({ onClose, fetchData, editId }) => {
  const [currentRole, setCurrentRole] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [editData, setEditData] = useState([]);
  const [statuscek, setStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setChecked] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    id: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    role: '',
  });

  const getData = async () => {
    try {
      const response = await fetch(`../api/role`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setListRole(data.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleModalClose = (resetForm) => {
    resetForm();
    onClose();
  };

  // insert unser
  const handleSubmit = async (values, currentRole) => {
    const payload = {
      id: values.id,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      roleOption: values.role,
      status: status === true ? 1 : 0,
    };
    // console.log('payload', payload);
    // console.log(selectedListeData.password);
    const sessionPost = await fetch('../api/manage/user/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(payload),
    }).then((ret) => {
      // console.log(ret.ok);
      if (ret.ok) {
        onClose();
        fetchData();
        const Info =
          values?.id !== '' && values?.id !== undefined
            ? 'User has been updated!'
            : 'User has been added!';
        Swal.fire(`${Info}`, '', 'success');
        // setIsOnProcess(!isOnProcess);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: 'Icon failed to insert, Something went wrong!',
          text: ret.statusText,
        });
      }
    });
  };

  const handleditData = async (editId) => {
    if (editId) {
      try {
        const response = await fetch(`../api/manage/user/edit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ id: editId }), // ubah menjadi objek dengan key 'id'
        });

        const data = await response.json();
        setEditData(data.data);
        setInitialFormValues({
          id: data.data[0]?.id || '',
          username: data.data[0]?.username || '',
          password: data.data[0]?.password || '',
          firstname: data.data[0]?.firstname || '',
          lastname: data.data[0]?.lastname || '',
          role: '',
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    } else {
      setInitialFormValues({
        id: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        role: '',
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleditData(editId);
  }, [editId]);

  const UsernameSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('username is required'),

    firstname: Yup.string().required('firstname is required'),
    lastname: Yup.string().required('lastname is required'),
    password: Yup.string().required('password is required'),
  });

  // status active & non active
  const handleStatus = (nextChecked) => {
    setChecked(nextChecked);
    setStatus(nextChecked);
  };

  const options = listRole.map((role) => ({
    value: role.id,
    label: role.nama,
  }));

  // setcurrentvaluerole
  const selectingFieldRole = async (fieldName, option) => {
    if (fieldName == 'role') {
      setCurrentRole(option);
    }
  };

  const handleCancel = (resetForm) => {
    // Mengosongkan nilai form saat tombol Cancel ditekan
    resetForm();
  };

  const SelectField = ({ options, currentValue, field, form }) => {
    return (
      <Select
        options={options}
        name="role"
        value={currentValue}
        onChange={(option) => {
          form.setFieldValue(field.name, option.value);
          // form.setFieldValue(option);
          selectingFieldRole(field.name, option);
        }}
        label="Single select"
      />
    );
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialFormValues}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        // console.log(values);
        setIsSubmitting(false);
        // console.log(currentRole.value != undefined ? 'yy' : 'xx');
        if (currentRole.value != undefined) {
          handleSubmit(values); // Panggil handleSubmit jika currentRole.length > 0
        }
      }}
    >
      {({ values, resetForm, errors, touched, isSubmitting, formik }) => (
        <Form>
          <div className="flex gap-2 ">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                firstname
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name={'firstname'}
                  id="firstname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="firstname"
                />
                {errors.firstname && touched.firstname ? (
                  <div className="text-red-600">{errors.firstname}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                last name
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="lastname"
                />
                {errors.lastname && touched.lastname ? (
                  <div className="text-red-600">{errors.lastname}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Field
                  type="username"
                  name="username"
                  id="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="username"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-600">{errors.username}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                password
              </label>
              <div className="mt-2">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  placeholder="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-600">{errors.password}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="role"
                  options={options}
                  currentValue={currentRole}
                  component={SelectField}
                  id="role"
                  placeholder="role"
                />
                {isSubmitting && currentRole.length === 0 ? (
                  <div className="error text-red-500 text-sm">
                    role ubis is required
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                status
              </label>
              <div className="mt-2">
                <>
                  <Switch
                    onChange={handleStatus}
                    checked={statuscek}
                    height={45}
                    handleDiameter={19}
                    width={99}
                    // values
                    uncheckedIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          fontSize: 13,
                          color: 'white',
                          paddingRight: 2,
                        }}
                      >
                        No Active
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          fontSize: 15,
                          color: 'white',
                          // paddingRight: 2
                        }}
                      >
                        Active
                      </div>
                    }
                    className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none transition-all"
                  />
                </>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Submit
              </button>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => handleModalClose(resetForm)}
              >
                Cancle
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
