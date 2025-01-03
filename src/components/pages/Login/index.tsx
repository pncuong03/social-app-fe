  import React from "react";
  import { Link, Navigate } from "react-router-dom";
  import { Button, Form, Input } from "antd";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import LocalStorage, { LocalStorageKey } from "src/utilities/local-storage/localStorage";
  import { useLogin } from "src/utilities/hooks/useLogin";

  interface FormValues {
    username: string;
    password: string;
  }

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").max(20).required("Password is required"),
  });

  const LoginPage = () => {
    const { onLogin } = useLogin();
    const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik<FormValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        await onLogin(values.username, values.password);
      },
    });

    if (accessToken) {
      return <Navigate to="/" />;
    }

    return (
      <div className="flex min-h-screen items-center justify-center gap-32 bg-gray-100 p-2 ">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
          <div className="mb-8 flex flex-col gap-5 text-center text-3xl font-medium">
            <img src="./img/logo.png" alt="Social Media" className="mx-auto w-32" />

            <div>Đăng nhập vào mạng xã hội</div>
          </div>

          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Input
                placeholder="Tài khoản"
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
                placeholder="Mật khẩu"
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
              Đăng nhập
            </Button>
          </Form>

          <Link to="/register">
            <Button
              size="large"
              className="mt-4 h-12 w-full rounded-lg bg-green-600 p-3 text-center text-lg font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  export default LoginPage;
