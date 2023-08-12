"use client";
import { useTranslations } from "next-intl";

import { ICouponCode } from "@/components/atoms/couponCode/types";

import Input from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";

const CouponCode = ({ className = "" }: ICouponCode) => {
  const t = useTranslations();

  return (
    <div className={`flex items-end gap-x-3 ${className}`}>
      <Input
        className="text-base"
        label={t("apply_coupon_code")}
        placeholder={t("coupon_code")}
        position="top-left"
      />
      <Button>{t("apply")}</Button>
    </div>
  );
};

export default CouponCode;
