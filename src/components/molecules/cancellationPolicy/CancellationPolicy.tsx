"use client";
import Modal from "@/components/atoms/modal/Modal";
import { useState } from "react";
import { get } from "lodash";
import { useTranslations } from "next-intl";
import BrokenLink from "../../../../public/images/broken_link.svg";
import Typography from "@/components/atoms/typography/Typography";

const CancellationPolicy = ({ policy }) => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="flex gap-x-3 cursor-pointer"
        onClick={() => setShowModal(true)}>
        <BrokenLink />
        <Typography variant="p3" element="p">
          {t("cancelation_policy")}
        </Typography>
      </div>
      <Modal
        label={
          <div
            dangerouslySetInnerHTML={{
              __html: get(policy, "title")
            }}></div>
        }
        isOpen={showModal}
        headerClass="text-2xl"
        bodyClass="lg:w-11/12 lg:max-w-5xl"
        setIsOpen={setShowModal}>
        <div
          dangerouslySetInnerHTML={{
            __html: get(policy, "value")
          }}></div>
      </Modal>
    </>
  );
};

export default CancellationPolicy;
