import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import LocalStorage, { LocalStorageKey } from "src/utilities/local-storage/localStorage";
import { useRegister } from "src/utilities/hooks/useRegister";

interface FormValues {
  fullName: string;
  birthday: string;
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").max(20).required("Password is required"),
  fullName: Yup.string().required("Fullname is required"),
  birthday: Yup.string().required("Birthday is required"),
});

const RegisterPage = () => {
  const { onRegister } = useRegister();
  const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      birthday: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await onRegister(values.fullName, values.username, values.password, values.birthday);
    },
  });

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen items-center justify-center gap-32 bg-gray-100 p-2 ">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
        <div className="mb-8 flex flex-col gap-5 text-center text-3xl font-medium">
          <img src="./img/logo.png" alt="Facebook" className="mx-auto w-32" />

          <div>Create a new account</div>
        </div>

        <Form onFinish={handleSubmit}>
          <Form.Item>
            <Input
              placeholder="Fullname"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-12"
            />

            {errors.fullName && touched.fullName && <p className="text-[red]">{errors.fullName}</p>}
          </Form.Item>

          <Form.Item name="birthday" required>
            <DatePicker
              size="middle"
              placeholder="Ngày/Tháng/Năm"
              format={"DD/MM/YYYY"}
              onChange={(date) => {
                setFieldValue("birthday", date ? date.toISOString() : "");
              }}
              className="h-12 w-full"
            />

            {errors.birthday && touched.birthday && <p className="text-[red]">{errors.birthday}</p>}
          </Form.Item>

          <Form.Item name="username">
            <Input
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-12"
            />

            {errors.username && touched.username && <p className="text-[red]">{errors.username}</p>}
          </Form.Item>

          <Form.Item>
            <Input.Password
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-12"
            />

            {errors.password && touched.password && <p className="text-[red]">{errors.password}</p>}
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className="h-12 w-full rounded-lg bg-blue-600 p-3 text-center text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </Button>
        </Form>

        <Link to="/login">
          <Button
            size="large"
            className="mt-4 h-12 w-full rounded-lg bg-green-600 p-3 text-center text-lg font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
