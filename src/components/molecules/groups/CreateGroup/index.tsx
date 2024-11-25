import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectFriend from "../../friend/SelectFriend";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGroup } from "src/slices/groups/groupSlice";

interface FormValues {
  name: string;
  userIds: number[];
  tagIds: number[];
}

interface Props {
  onSuccess: () => void;
}

const CreateGroup = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    name: Yup.string().required(t("message.validnamegroup")),
  });

  const { errors, touched, values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      name: "",
      userIds: [],
      tagIds: [0],
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      dispatch(createGroup(values));
      setTimeout(() => {
        setFieldValue("name", "");
        setFieldValue("userIds", []);
        toast.success(t("groups.createsuccessgroup"));
        setLoading(false);

        if (props.onSuccess) {
          props.onSuccess();
        }
      }, 3000);
    },
  });

  return (
    <Form onFinish={handleSubmit} className="flex h-full flex-col">
      <div className="">
        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("message.groupname")}:</label>

          <Input
            placeholder={t("message.groupname")}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-11"
            disabled={loading}
          />

          {errors.name && touched.name && <p className="text-[red]">{errors.name}</p>}
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("message.invitefriend")}:</label>

          <SelectFriend isDefaultGetAll onSelect={(value) => setFieldValue("userIds", value)} />
        </Form.Item>
      </div>

      <Form.Item className="mt-auto">
        <Button
          htmlType="submit"
          type="primary"
          className="interceptor-loading h-12 w-full rounded-lg bg-blue-600 p-3 text-center text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={loading}
        >
          {t("groups.creategroup")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
