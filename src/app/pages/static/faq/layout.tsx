import { IFaqLayout } from "@/app/pages/static/faq/types";

const FaqLayout = ({ children }: IFaqLayout)=> {
  return <section>{children}</section>;
};

export default FaqLayout;
