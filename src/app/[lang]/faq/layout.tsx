import { IFaqLayout } from "@/app/[lang]/faq/types";

const FaqLayout = ({ children }: IFaqLayout)=> {
  return <section>{children}</section>;
};

export default FaqLayout;
