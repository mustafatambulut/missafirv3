import { IContactLayout } from "@/app/[lang]/contact/types";

const ContactLayout = ({ children }: IContactLayout)=> {
  return <section>{children}</section>;
};

export default ContactLayout;
