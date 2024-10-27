import React from "react";
import GroupsTiny from "src/components/molecules/Groups/GroupsTiny";
const GroupsJoins = () => {
  return( <div>
  <div>
  <h6 className="p-6 text-2xl font-medium md:p-2 lg:px-10 xl:px-2">Yêu cầu tham gia nhóm đang chờ</h6>
  <p>Xem các nhóm và kênh bảng feed mà bạn đã yêu cầu tham gia. Có thể bạn sẽ phải trả lời câu hỏi thì một số nhóm mới phê duyệt yêu cầu tham gia của bạn.
  </p>
  <GroupsTiny></GroupsTiny>

  <div className="border-b-2 pb-8 pt-8 mb-8"></div>
    <div className="p-6 text-2xl font-medium md:p-2 lg:px-10 xl:px-2">Tất cả nhóm bạn đã tham gia</div>
  </div>
  <div>
  <h6 className="p-6 text-2xl font-medium md:p-2 lg:px-10 xl:px-2"></h6>
  <div className="flex space-x-4 ">
  <GroupsTiny></GroupsTiny>
  <GroupsTiny></GroupsTiny>
  <GroupsTiny></GroupsTiny>
  </div>
  </div>
  </div>
  )
};


export default GroupsJoins;
