import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "antd";
import { useFormik } from "formik";
import { AppDispatch } from "src/app/store";
import { useDispatch } from "react-redux";
import { addMemberChat } from "src/slices/messages/messageSlice";
import { toast } from "react-toastify";
import SelectFriend from "src/components/molecules/friend/SelectFriend";

interface FormValues {
  groupChatId: string;
  userIds: string[];
}

interface Props {
  groupId: string;
  nameGroup: string;
  onSuccess: () => void;
}

const AddMemberChat = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { handleSubmit, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      groupChatId: props.groupId,
      userIds: [],
    },
    onSubmit: (values) => {
      dispatch(addMemberChat(values));

      setTimeout(() => {
        setFieldValue("userIds", []);
        toast.success(t("message.addmembersuccess"));

        if (props.onSuccess) {
          props.onSuccess();
        }
      }, 3000);
    },
  });

  return (
    <Form onFinish={handleSubmit} className="flex h-full flex-col">
      <Form.Item>
        <label className="mb-2 block text-lg font-medium">{t("message.invitefriend")}:</label>

        <SelectFriend isDefaultGetAll onSelect={(value) => setFieldValue("userIds", value)} />
      </Form.Item>

      <Form.Item className="mt-auto">
        <Button
          htmlType="submit"
          type="primary"
          className="h-12 w-full rounded-lg bg-blue-600 p-3 text-center text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {t("message.addperson")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMemberChat;
