import { NextResponse, NextRequest } from "next/server";
import { isEmpty } from "lodash";
import { payment } from "@/service/api";

export async function POST(req: NextRequest) {
  const data: any = {};
  let _responseData: any;
  const formData = await req.formData();
  // todosx
  const isProduction = () => process.env.NODE_ENV === "production";
  const destinationUrl = new URL(
    "/reservation",
    isProduction()
      ? process.env.ORIGIN_URL_PROD
      : process.env.ORIGIN_URL_DEV
  );

  formData.forEach((value, key) => {
    data[key] = value;
  });

  if (!isEmpty(data)) {
    const response: any = await payment({ path: "failed", payload: data });
    _responseData = response.data;
    console.log("-----------------------");
    console.log("response", _responseData);
  }

  return NextResponse.redirect(`${destinationUrl}?step=3&message=${_responseData?.data.message}`, { status: 302 });
}
