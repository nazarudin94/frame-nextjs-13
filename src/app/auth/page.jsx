'use client';
import { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const UsernameSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('username is required'),
    password: Yup.string().required('password is required'),
  });

  // function error(message) {
  //   Swal(message, '', 'error');
  // }

  const handleLogin = async (values) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    try {
      const auth = await fetch('../api/auth/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!auth.ok) {
        throw new Error('Authentication failed');
      }

      const response = await auth.json();

      if (response.message === 'ok') {
        // Handle successful authentication
        // Set the token in the cookie or localStorage
        // Cookie.set('token', response.token);
        // Redirect the user to the desired page
        router.push('/');
      } else {
        // Handle other cases, if needed
      }
    } catch (error) {
      console.error('Error occurred during login:', error.message);
      // Display an error message to the user, or perform other error handling
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              /> */}
            SIMA
          </span>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                LOGIN
              </h1>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={UsernameSchema}
                onSubmit={(values) => {
                  setIsSubmitting(false);
                  // console.log(values);
                  handleLogin(values);
                }}
              >
                {({ values, resetForm, errors, touched, formik }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <Field
                        type="username"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-600">{errors.username}</div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-600">{errors.password}</div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
