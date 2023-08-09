"use client";
import { get } from "lodash";

import { BODY } from "@/app/constants";
import useFetchData from "@/app/hooks/useFetchData";
import { PREMIUM_SECTION } from "@/components/atoms/premium/constants";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Loading from "@/components/atoms/loading/Loading";

const Premium = () => {
  const premium = useFetchData(BODY, PREMIUM_SECTION);

  return (
    <Loading
      isLoading={!premium}
      loader={<p className="text-xl">Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
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
    </Loading>
  );
};

export default Premium;
