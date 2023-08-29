"use client";
import { useAppSelector } from "@/redux/hooks";
import { IContact } from "@/app/[lang]/contact/types";

import ContactForm from "@/components/organisms/contactForm/ContactForm";
import ContactSuccess from "@/components/atoms/contactSuccess/ContactSuccess";

const Contact = ({ className = "" }: IContact) => {
  const { isSend } = useAppSelector((state) => state.contactReducer);

  return (
    <div className={`${className}`}>
      {isSend ? <ContactSuccess /> : <ContactForm />}
    </div>
  );
};

export default Contact;
