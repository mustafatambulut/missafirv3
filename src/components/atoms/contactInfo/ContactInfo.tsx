import { IContactInfo } from "@/components/atoms/contactInfo/types";

const ContactInfo = ({ className="" }:IContactInfo) => {

  return (
    <div className={`flex gap-x-8 ${className}`}>
      <div>image</div>
      <div>country</div>
      <div></div>
    </div>
  );
};

export default ContactInfo;
