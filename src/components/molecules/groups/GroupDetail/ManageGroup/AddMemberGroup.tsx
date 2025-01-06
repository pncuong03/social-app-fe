import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Form } from "antd";
import { useFormik } from "formik";
import { AppDispatch } from "src/app/store";
import SelectFriend from "src/components/molecules/friend/SelectFriend";
import { addMemberGroup } from "src/slices/groups/groupSlice";

interface FormValues {
  groupId: number;
  userIds: number[];
}

interface Props {
  groupId: number;
  onSuccess: () => void;
}

const AddMemberGroup = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { handleSubmit, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      groupId: props.groupId,
      userIds: [],
    },
    onSubmit: (values) => {
      dispatch(addMemberGroup(values));

      setTimeout(() => {
        setFieldValue("userIds", []);
        toast.success(t("message.addmembersuccess"));

        if (props.onSuccess) {
          props.onSuccess();
        }
      }, 1000);
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
          className=" h-12 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 p-3 text-center text-lg font-medium text-white transition-all duration-200 ease-in-out hover:from-blue-600 hover:to-cyan-600 focus:outline-none"
        >
          {t("message.addperson")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMemberGroup;
