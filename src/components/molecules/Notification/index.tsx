import React, { useState } from "react";
import { List, Avatar, Button } from "antd";
import PopoverCustomize from "src/components/atoms/Popover";

interface Notification {
  title: string;
  description: string;
  avatar?: string;
}

interface Props {
  notifications: Notification[];
  children: React.ReactNode;
}

const NotificationList = (props: Props) => {
  const [visibleCount, setVisibleCount] = useState(5); // Bắt đầu với 5 thông báo đầu tiên

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Tăng thêm 5 thông báo mỗi khi nhấn "Xem thêm"
  };

  const content = (
    <div className="max-h-96 overflow-y-auto">
      <List
        itemLayout="horizontal"
        dataSource={props.notifications.slice(0, visibleCount)} // Chỉ hiển thị thông báo theo số lượng visibleCount
        className="w-80 md:w-96"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.avatar ? <Avatar src={item.avatar} /> : <Avatar icon={<i className="fa fa-user" />} />} // Hiển thị avatar hoặc icon mặc định
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />

      {visibleCount < props.notifications.length && (
        <div className="mt-2 text-center">
          <Button onClick={handleLoadMore}>Xem thêm</Button>
        </div>
      )}
    </div>
  );

  return (
    <PopoverCustomize content={content} title="Thông báo">
      {props.children}
    </PopoverCustomize>
  );
};

export default NotificationList;
