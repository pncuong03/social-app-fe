import React from "react";
import { useTranslation } from "react-i18next";
import { Button, DatePicker, Form, Input } from "antd";
import { useFormik } from "formik";

interface FormValues {
  fullname: string;
  date: string;
  username: string;
  password: string;
}

const CreateGroup = () => {
  const { t } = useTranslation();
  const { values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      fullname: "",
      date: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("🚀 ~ onSubmit ~ values:", values);
    },
  });

  return (
    <Form onFinish={handleSubmit} className="flex h-full flex-col">
      <div className="flex-grow">
        <Form.Item>
          <Input
            placeholder={t("groups.groupname")}
            name="fullname"
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-12"
          />
        </Form.Item>

        <Form.Item name="date" required>
          <DatePicker
            size="middle"
            placeholder="Ngày/Tháng/Năm"
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              setFieldValue("date", date ? date.toISOString() : "");
            }}
            className="h-12 w-full"
          />
        </Form.Item>

        <Form.Item>
          <Input
            placeholder={t("groups.invitefriend")}
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-12"
          />
        </Form.Item>
      </div>

      <Form.Item className="mt-auto">
        <Button
          htmlType="submit"
          type="primary"
          className="h-12 w-full rounded-lg bg-blue-600 p-3 text-center text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Tạo nhóm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
