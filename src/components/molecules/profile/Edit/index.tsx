import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "src/app/appHooks";
import { AppDispatch } from "src/app/store";
import { editInfo } from "src/slices/user/userSlice";
import { selectUserInfo } from "src/slices/login/selector";
import ModalCustomize from "src/components/atoms/Modal";
import ImageUploader from "../../upload";
interface FormValues {
  fullName: string;
  birthdayString: string;
  gender: string;
  work: string;
  description: string;
  live: string;
  imageUrl: string;
  imageBackground: string;
}

interface Props {
  open?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const EditProfile = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const userInfo = useAppSelector(selectUserInfo.getUserInfo);

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      fullName: userInfo.fullName,
      birthdayString: userInfo.birthday,
      gender: userInfo.gender,
      work: userInfo.work,
      description: userInfo.description,
      live: userInfo.live,
      imageUrl: userInfo.imageUrl,
      imageBackground: userInfo.imageBackground,
    },
    onSubmit: (values) => {
      setLoading(true);

      dispatch(editInfo(values));
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
    setFieldValue("fullName", userInfo.fullName);
    setFieldValue("birthdayString", userInfo.birthday);
    setFieldValue("gender", userInfo.gender);
    setFieldValue("work", userInfo.work);
    setFieldValue("description", userInfo.description);
    setFieldValue("live", userInfo.live);
    setFieldValue("imageUrl", userInfo.imageUrl);
    setFieldValue("imageBackground", userInfo.imageBackground);
  }, [userInfo]);

  return (
    <ModalCustomize title={t("profile.editprofile")} open={props.open} onCancel={props.onCancel}>
      <Form onFinish={handleSubmit} className="mt-2">
        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.avatar")}:</label>

          <ImageUploader
            imageUrl={values.imageUrl}
            onChange={(url) => setFieldValue("imageUrl", url)}
            inputId="avatarUpload"
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.background")}:</label>

          <ImageUploader
            imageUrl={values.imageBackground}
            onChange={(url) => setFieldValue("imageBackground", url)}
            inputId="coverUpload"
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.fullname")}:</label>

          <Input
            placeholder={t("profile.fullname")}
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-10 rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item name="birthday">
          <label className="mb-2 block text-lg font-medium">{t("profile.birdthday")}:</label>

          <DatePicker
            size="middle"
            placeholder={t("profile.birdthday")}
            format={"DD/MM/YYYY"}
            defaultValue={values.birthdayString ? dayjs(values.birthdayString) : undefined}
            onChange={(date) => {
              setFieldValue("birthdayString", date ? date.toISOString() : "");
            }}
            className="h-10 w-full rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.sex")}:</label>

          <Select
            placeholder={t("profile.sex")}
            defaultValue={values.gender}
            onChange={(value) => setFieldValue("gender", value)}
            className="h-10 [&_.ant-select-selector]:rounded-full"
            disabled={loading}
          >
            <Select.Option value="Male">{t("profile.male")}</Select.Option>

            <Select.Option value="Female">{t("profile.female")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.work")}:</label>

          <Input
            placeholder={t("profile.work")}
            name="work"
            value={values.work}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-10 rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.description")}:</label>

          <Input
            placeholder={t("profile.description")}
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-10 rounded-full"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <label className="mb-2 block text-lg font-medium">{t("profile.address")}:</label>

          <Input
            placeholder={t("profile.address")}
            name="live"
            value={values.live}
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
        >
          {t("profile.updateinfo")}
        </Button>
      </Form>
    </ModalCustomize>
  );
};

export default EditProfile;
