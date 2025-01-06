import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Form, Input, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "src/app/store";
import { onCreateImage } from "src/apis/post";
import { createGroup } from "src/slices/groups/groupSlice";
import IconCustomize from "src/components/atoms/Icons";
import SelectFriend from "../../friend/SelectFriend";

interface FormValues {
  name: string;
  userIds: number[];
  tagIds: number[];
  imageUrl: string;
}

interface Props {
  onSuccess: () => void;
}

type FileType = RcFile;

const CreateGroup = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const validationSchema = Yup.object({
    name: Yup.string().required(t("message.validnamegroup")),
    imageUrl: Yup.string().required(t("message.validimgaegroup")),
    userIds: Yup.array().min(1, t("message.validfriendgroup")),
  });

  const beforeUpload = async (file: FileType) => {
    const data = new FormData();

    data.append("images", file);

    const response = await onCreateImage(data);

    if (response && response.data) {
      setImageUrl(response.data);
      setFieldValue("imageUrl", response.data);
    }

    return false;
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setFieldValue("imageUrl", "");
  };

  const { errors, touched, values, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      name: "",
      userIds: [],
      tagIds: [0],
      imageUrl: "",
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
          <label className="mb-2 block text-lg font-medium">{t("groups.imagegroup")}:</label>

          {imageUrl ? (
            <div className="flex flex-col items-center gap-2">
              <img src={imageUrl} alt="Group" className="h-24 w-24 rounded-md object-cover" />

              <button onClick={handleRemoveImage}>
                <div className="mt-2 hover:text-blue-400">{t("groups.deleteimage")}</div>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Upload
                accept="image/*"
                listType="picture-card"
                beforeUpload={beforeUpload}
                maxCount={1}
                showUploadList={false}
              >
                <IconCustomize name="plus" />
              </Upload>
            </div>
          )}

          {errors.imageUrl && touched.imageUrl && <p className="text-[red]">{errors.imageUrl}</p>}
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
          {t("groups.creategroup")}
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
