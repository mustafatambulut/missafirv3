import { NextResponse, NextRequest } from "next/server";
import { isEmpty } from "lodash";
import { payment } from "@/service/api";

export async function POST(req: NextRequest) {
  const data: any = {};
  let _responseData: any;
  let _isFailed: boolean = false;
  const formData = await req.formData();
  
  const isProduction = () => process.env.NODE_ENV === "production";
  const destinationUrl = new URL(
    "/payment/success",
    isProduction()
      ? process.env.ORIGIN_URL_PROD
      : process.env.ORIGIN_URL_DEV
  );
  const destinationFailedUrl = new URL(
    "/reservation",
    isProduction()
      ? process.env.ORIGIN_URL_PROD
      : process.env.ORIGIN_URL_DEV
  );

  formData.forEach((value, key) => {
    data[key] = value;
  });

  if (!isEmpty(data)) {
    const response: any = await payment({ path: "success", payload: data });
    _responseData = response.data;
    _isFailed = !response?.data?.status;
    console.log("-----------------------")
    console.log("response", _responseData)
  }
  
  const route = _isFailed ? 
      `${destinationFailedUrl}?step=3&message=${encodeURIComponent(_responseData?.message || _responseData?.title)}`
      : 
      `${destinationUrl}?thread=${_responseData?.data?.messageThred}`;

  return NextResponse.redirect(route, {status: 302});
}
