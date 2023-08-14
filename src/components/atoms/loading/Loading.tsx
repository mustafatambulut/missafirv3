import { ILoading } from "@/components/atoms/loading/types";

const Loading = ({ isLoading, children, loader }: ILoading) => {
  return <>{!isLoading ? children : loader}</>;
};

export default Loading;
