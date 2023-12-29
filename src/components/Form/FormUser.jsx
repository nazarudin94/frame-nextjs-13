import React, { useEffect, useState } from 'react';

import { Field, Formik, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import Switch from 'react-switch';

const FormComponent = ({ onClose }) => {
  const [currentRole, setCurrentRole] = useState([]);
  const [statuscek, setStatus] = useState(false);
  const [status, setChecked] = useState(false);
  const [listRole, setListRole] = useState([]);
  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, []);

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
      initialValues={{
        username: '',
        password: '',
        firstname: '',
        lastname: '',
      }}
      validationSchema={UsernameSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
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
                  type="firstname"
                  name="firstname"
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
                  type="lastname"
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
                  type="role"
                  name="role"
                  options={options}
                  currentValue={currentRole}
                  component={SelectField}
                  id="role"
                  placeholder="role"
                />
                {errors.role && touched.role ? (
                  <div className="text-red-600">{errors.role}</div>
                ) : null}
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
                onClick={onClose}
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
