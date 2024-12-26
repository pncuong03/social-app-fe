import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Button, Form, Input } from "antd";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import ModalCustomize from "src/components/atoms/Modal";
import ImageUploader from "../../upload";
import { selectInfoGroup } from "src/slices/groups/selector";
import { editGroup } from "src/slices/groups/groupSlice";

interface FormValues {
  name: string;
  imageUrl: string;
  description: string;
}

interface Props {
  groupId: number;
  open?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const EditGroup = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const infogroup = useAppSelector(selectInfoGroup.getInfoGroup);

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      name: infogroup.name,
      imageUrl: infogroup.imageUrl,
      description: infogroup.description,
    },
    onSubmit: (values) => {
      setLoading(true);

      dispatch(editGroup({ groupId: props.groupId, params: values }));

      setTimeout(() => {
        toast.success(t("profile.editprofilesuccess"));
        setLoading(false);

        if (props.onSuccess) {
          props.onSuccess();
        }
      }, 3000);
    },
  });

  useEffect(() => {
    setFieldValue("name", infogroup.name);
    setFieldValue("imageUrl", infogroup.imageUrl);
    setFieldValue("description", infogroup.description);
  }, [infogroup]);

  return (
    <ModalCustomize title={t("groups.editgroup")} open={props.open} onCancel={props.onCancel}>
      <Form onFinish={handleSubmit} className="mt-2">
        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("groups.imagegroup")}:</label>

          <ImageUploader
            imageUrl={values.imageUrl}
            onChange={(url) => setFieldValue("imageUrl", url)}
            inputId="avatarUpload"
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("groups.groupname")}:</label>

          <Input
            placeholder={t("groups.groupname")}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-10 rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("groups.description")}:</label>

          <Input
            placeholder={t("groups.description")}
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-10 rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Button
          htmlType="submit"
          type="primary"
          className="h-12 w-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:from-teal-500 hover:to-blue-600 focus:outline-none"
          disabled={loading}
        >
          {t("groups.updategroup")}
        </Button>
      </Form>
    </ModalCustomize>
  );
};

export default EditGroup;
