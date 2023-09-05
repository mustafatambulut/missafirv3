import { get } from "lodash";

import { IUser } from "@/components/atoms/userInfo/types";

const UserInfo = ({ user }: IUser) => {
  return (
    <div className="lg:shadow-base-blur-10 lg:rounded-xl flex items-center gap-2 lg:px-5 lg:py-4 overflow-hidden">
      <div className="flex flex-col items-start justify-center">
        <span className="text-22 lg:text-xl text-gray-800 font-mi-sans-semi-bold">
          {get(user, "fullname")}
        </span>
        <span className="text-base lg:text-lg text-gray-700 whitespace-nowrap max-w-full overflow-hidden">
          {get(user, "email")}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
