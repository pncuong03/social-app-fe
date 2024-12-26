import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/app/appHooks";
import ModalCustomize from "src/components/atoms/Modal";
import { Image, Pagination } from "antd";
import { selectImageofUser } from "src/slices/friend/selector";

interface Props {
  open?: boolean;
  onCancel?: () => void;
}

const Album = (props: Props) => {
  const { t } = useTranslation();

  const images = useAppSelector(selectImageofUser.getImageofUser);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = images?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ModalCustomize title={t("profile.allimages")} open={props.open} onCancel={props.onCancel}>
      <div className="mb-2">
        <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-4">
          {currentImages?.map((image: any, index: number) => (
            <Image
              key={index}
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              className="cursor-pointer rounded-lg object-cover"
              width={100}
              height={100}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={images?.length || 0}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </ModalCustomize>
  );
};

export default Album;
