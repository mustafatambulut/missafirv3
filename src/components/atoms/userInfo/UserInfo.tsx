"use client";
import get from "lodash/get";
import { getLocalStorage } from "@/utils/helper";
import Typography from "../typography/Typography";
import { AUTH_USER_KEY } from "@/app/constants";

const UserInfo = () => {
  const authUser = getLocalStorage(AUTH_USER_KEY)
    ? JSON.parse(getLocalStorage(AUTH_USER_KEY))
    : null;
  return (
    <div className="lg:shadow-base-blur-10 lg:rounded-xl flex items-center gap-2 lg:px-5 lg:py-4 overflow-hidden">
      <div className="flex flex-col items-start justify-center">
        <Typography
          variant="h6"
          element="h6"
          className="text-gray-800 font-mi-sans-semi-bold">
          {get(authUser, "fullname", "")}
        </Typography>
        <Typography
          variant="p3"
          element="p3"
          className="text-gray-700 whitespace-nowrap max-w-full overflow-hidden">
          {get(authUser, "email", "")}
        </Typography>
      </div>
    </div>
  );
};

export default UserInfo;
