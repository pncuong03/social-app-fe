import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "src/app/store";
import { createGroupChat } from "src/slices/messages/messageSlice";
import SelectFriend from "../../friend/SelectFriend";

interface FormValues {
  name: string;
  userIds: string[];
}

interface Props {
  onSuccess: () => void;
}

const CreateGroupChat = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("message.validnamegroup")),
    userIds: Yup.array().min(1, t("message.validfriendgroup")),
  });

  const { errors, touched, values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      name: "",
      userIds: [],
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      dispatch(createGroupChat(values));
      setTimeout(() => {
        setFieldValue("name", "");
        setFieldValue("userIds", []);
        toast.success(t("message.createsuccesschat"));
        setLoading(false);

        if (props.onSuccess) {
          props.onSuccess();
        }
      }, 1000);
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
            className="h-11 rounded-full"
            disabled={loading}
          />

          {errors.name && touched.name && <p className="text-[red]">{errors.name}</p>}
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("message.invitefriend")}:</label>

          <SelectFriend isDefaultGetAll onSelect={(value) => setFieldValue("userIds", value)} />

          {/* {errors.userIds && touched.userIds && <p className="text-[red]">{errors.userIds}</p>} */}
        </Form.Item>
      </div>

      <Form.Item className="mt-auto">
        <button
          type="submit"
          className=" h-12 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-3 text-center text-lg font-medium text-white transition-all duration-200 ease-in-out hover:from-blue-600 hover:to-cyan-600 focus:outline-none"
          disabled={loading}
        >
          {t("message.creategroup")}
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroupChat;
