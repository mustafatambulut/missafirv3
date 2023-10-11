"use client";

// import { BODY } from "@/app/constants";
// import { PREMIUM_SECTION } from "@/components/atoms/premium/constants";
// import useFetchData from "@/app/hooks/useFetchData";
// import { IPremium } from "@/components/atoms/premiumStatic/types";

import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Typography from "../typography/Typography";
// import Loading from "@/components/atoms/loading/Loading";

const PremiumStatic = ({
  title,
  description,
  buttonLabel,
  image
}: any) => {
  // const premium = useFetchData<any>(BODY, PREMIUM_SECTION);

  return (
    // <Loading
    //   isLoading={!premium}
    //   loader={<p className="text-xl">Loading feed...</p>}>
    <div className="px-2 lg:px-8 mt-14">
      <Card
        className="text-white rounded-xl p-8"
        style={{ backgroundImage: `url(${image})` }}
      // style={{ backgroundImage: `url(${get(premium, "body.image")})` }}
      >
        <Typography
          variant="h3"
          element="h3"
          className="font-mi-sans-semi-bold"
        >
          {title}
        </Typography>
        <Typography variant="p2" element="p" className="py-4">
          {description}
        </Typography>
        <Button
          variant="btn-white"
          className="w-48 text-md"
        // link={get(premium, "footer.link")}
        >
          {buttonLabel}
        </Button>
      </Card>
    </div>
    // </Loading>
  );
};

export default PremiumStatic;