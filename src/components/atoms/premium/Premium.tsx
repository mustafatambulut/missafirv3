"use client";
import { useEffect, useState } from "react";
import { find, get, head, size } from "lodash";

import { BODY } from "@/app/constants";
import { useAppSelector } from "@/app/hooks";
import { PREMIUM_SECTION } from "@/components/atoms/premium/constants";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";

const Premium = () => {
  const [premium, setPremium] = useState(null);

  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) {
      const data = get(head(entities), BODY);
      setPremium(find(data, { __component: PREMIUM_SECTION }));
    }
  }, [entities]);

  return (
    <>
      {premium && (
        <div className="px-4 lg:px-8 mt-14">
          <Card
            className="text-white rounded-xl p-8"
            style={{ backgroundImage: `url(${get(premium, "body.image")})` }}>
            <h2 className="text-4xl font-mi-sans-semi-bold">
              {get(premium, "header.title")}
            </h2>
            <p className="text-xl py-4">{get(premium, "body.title")}</p>
            <Button
              variant="btn-white"
              className="w-40 text-2xl"
              link={get(premium, "footer.link")}>
              {get(premium, "footer.label")}
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Premium;
