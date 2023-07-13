"use client";
import { useEffect, useState } from "react";
import { filter, first, get } from "lodash";

import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";

const Premium = () => {
  const [premium, setPremium] = useState(null);
  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const premiumData = first(
      filter(response, (item) => item["__component"] === "sections.premium")
    );
    setPremium(premiumData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {premium && (
        <div className="px-4 lg:px-8 mt-14">
          <Card
            className="text-white rounded-xl"
            style={{ backgroundImage: `url(${get(premium, "body.image")})` }}>
            <h2 className="text-4xl font-mi-sans-semi-bold">
              {get(premium, "header.title")}
            </h2>
            <p className="text-xl">{get(premium, "body.title")}</p>
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
