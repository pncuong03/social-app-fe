import { toast } from "react-toastify";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/app/store";
import { createGroupChat } from "src/slices/messages/messageSlice";
import SelectFriend from "../../friend/SelectFriend";
import React, { useState } from "react";

interface Props {
  onSuccess: () => void;
}

  interface FormValues {
    userIds: string[];
    name: string;
  }

  const CreateGroupChat = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>(a);
    const validationSchema = Yup.object({
      name: Yup.string().required(t("message.validnamegroup")),
      userIds: Yup.array().min(1, t("message.validfriendgroup")),
    });

    const { t } = useTranslation();

    const [loading, setLoadinga] = useState(false);

    const { errors, touched, values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
      validationSchema,
      initialValues: {
        name: "",
        userIds: [],
      },
      onSubmit: (values) => {
        setLoadinga(true);
        setTimeout(() => {
          setFieldValue("name", "");
          setFieldValue("userIds", []);
          toast.success(t("message.createsuccesschat"));
          setLoadinga(false);

          if (props.onSuccess) {
            props.onSuccess();
          }
        }, 3000);
        dispatch(createGroupChat(values));
      },
    });

    return (
      <Form onFinish={handleSubmit} className="flex h-full flex-col">
        <div className="">

          <Form.Item className="mt-auto">
            <button
                type="submit"
                className=" h-12 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-3 text-center text-lg font-medium text-white transition-all duration-200 ease-in-out hover:from-blue-600 hover:to-cyan-600 focus:outline-none"
                disabled={loading}
            >
              {t("message.creategroup")}
            </button>
          </Form.Item>
          <Form.Item>
            <label className="mb-2 block text-lg font-medium">{t("message.invitefriend")}:</label>

            <SelectFriend isDefaultGetAll onSelect={(value) => setFieldValue("userIds", value)} />

            {/* {errors.userIds && touched.userIds && <p className="text-[red]">{errors.userIds}</p>} */}
          </Form.Item>
          <Form.Item>

            <Input
                placeholder={t("message.groupname")}
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-11 rounded-full"
                disabled={loading}
            />

            <label className="mb-2 block text-lg font-medium">{t("message.groupname")}:</label>

            {errors.name && touched.name && <p className="text-[red]">{errors.name}</p>}
          </Form.Item>
        </div>
      </Form>
    );
  };

  export default CreateGroupChat;
