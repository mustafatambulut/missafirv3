"use client";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/redux/hooks";

import Loading from "@/components/atoms/loading/Loading";
import BannerSkeleton from "@/components/molecules/skeletons/bannerSkeleton/BannerSkeleton";

const Garanti = () => {
  const correction = {
    '"': '"',
    "\n": "",
    "\r": "",
    "\t": ""
  };

  const { html } = useAppSelector((state) => state.bankReducer);
  const [loading, setLoading] = useState<boolean>(true);
  const [htmlElement, setHtmlElement] = useState<any>(
    html &&
      html.replace(
        new RegExp(Object.keys(correction).join("|"), "g"),
        (matched) => correction[matched]
      )
  );

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      document &&
        (document as any).postForm &&
        (document as any).postForm.submit();
      document && document.forms && document.forms[0].submit();
    }, 150);
  }, [html]);
  // todosx
  console.log("html htmlElement", htmlElement);
  //const htmlVia3d = ``;
  const htmlx =
    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\r\n<html>\r\n<head>\r\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" pageEncoding="UTF-8"/>\r\n<title>Garanti Bankası Ortak Ödeme Sayfası</title>\r\n</head>\r\n<body  onLoad="javascript:OnLoadEvent();" >\r\n\r\n<form name="postForm"  action="http://missafirweb.local.com/checkout/failed" method="POST">\r\n\r\n<input type="hidden" name="xid" value="dd11947f-9d71-4748-a1b3-1b14ca3a4a07">\n<input type="hidden" name="mdstatus" value="0">\n<input type="hidden" name="mderrormessage" value="Not authenticated">\n<input type="hidden" name="txnstatus" value="">\n<input type="hidden" name="eci" value="00">\n<input type="hidden" name="cavv" value="">\n<input type="hidden" name="paressyntaxok" value="">\n<input type="hidden" name="paresverified" value="">\n<input type="hidden" name="version" value="">\n<input type="hidden" name="ireqcode" value="">\n<input type="hidden" name="ireqdetail" value="">\n<input type="hidden" name="vendorcode" value="">\n<input type="hidden" name="cavvalgorithm" value="">\n<input type="hidden" name="md" value="aW5kZXg6MDIXMzIy4AbGE+oe5z41LnhJOvOUIAzkF5Q6TVO6wnrk6x5yOw025X6FMvaFVPHxEiAxISz18opogLRNU/gZovnd/jL9LfmuXASJhOAesYWbli+oj1nRiqkWIC0K56yTvcdfO3K2OuB0TN9oDRJjhuQswHRH74ucnzMygfUAG72FGg==">\n<input type="hidden" name="terminalid" value="30691297">\n<input type="hidden" name="oid" value="MSFRDBW77275">\n<input type="hidden" name="authcode" value="">\n<input type="hidden" name="response" value="Error">\n<input type="hidden" name="errmsg" value="">\n<input type="hidden" name="hostmsg" value="">\n<input type="hidden" name="procreturncode" value="">\n<input type="hidden" name="transid" value="MSFRDBW77275">\n<input type="hidden" name="hostrefnum" value="">\n<input type="hidden" name="rnd" value="0U4oNjSV89gxcXJFAvaW">\n<input type="hidden" name="hash" value="0kXwU+eRYDqDHCTiEwOMW2WQl3M=">\n<input type="hidden" name="hashparams" value="clientid:oid:authcode:procreturncode:response:mdstatus:cavv:eci:md:rnd:">\n<input type="hidden" name="hashparamsval" value="30691297MSFRDBW77275Error000aW5kZXg6MDIXMzIy4AbGE+oe5z41LnhJOvOUIAzkF5Q6TVO6wnrk6x5yOw025X6FMvaFVPHxEiAxISz18opogLRNU/gZovnd/jL9LfmuXASJhOAesYWbli+oj1nRiqkWIC0K56yTvcdfO3K2OuB0TN9oDRJjhuQswHRH74ucnzMygfUAG72FGg==0U4oNjSV89gxcXJFAvaW">\n<input type="hidden" name="clientid" value="30691297">\n<input type="hidden" name="MaskedPan" value="55496041****0011">\n<input type="hidden" name="successurl" value="http://missafirweb.local.com/checkout/success">\n<input type="hidden" name="txninstallmentcount" value="">\n<input type="hidden" name="refreshtime" value="5">\n<input type="hidden" name="orderid" value="MSFRDBW77275">\n<input type="hidden" name="txntype" value="sales">\n<input type="hidden" name="terminalmerchantid" value="7000679">\n<input type="hidden" name="txnamount" value="26400">\n<input type="hidden" name="txntimestamp" value="1694609569">\n<input type="hidden" name="terminaluserid" value="PROVAUT">\n<input type="hidden" name="mode" value="TEST">\n<input type="hidden" name="txncurrencycode" value="949">\n<input type="hidden" name="secure3dhash" value="96297FEF582694172D7ABBC05BCD19D52FE398B1">\n<input type="hidden" name="apiversion" value="v0.01">\n<input type="hidden" name="companyname" value="MSFR">\n<input type="hidden" name="errorurl" value="http://missafirweb.local.com/checkout/failed">\n<input type="hidden" name="secure3dsecuritylevel" value="3D_PAY">\n<input type="hidden" name="customeremailaddress" value="mesut@mesut.net">\n<input type="hidden" name="customeripaddress" value="10.40.52.35">\n<input type="hidden" name="orderdescription1" value="MSFRDBW77275">\n<input type="hidden" name="terminalid" value="30691297">\n<input type="hidden" name="terminalprovuserid" value="PROVAUT">\n<input type="hidden" name="lang" value="tr">\n\r\n\t  \r\n<noscript>\r\n  <center>Lütfen aşağıdaki devam butonuna basınız<br>    \r\n  <input type="submit" value="Devam"></center>\r\n</noscript>\r\n</form>\r\n\r\n<SCRIPT LANGUAGE="Javascript" >\r\nfunction OnLoadEvent() {\r\n  document.postForm.submit();  \r\n}\r\n</SCRIPT>\r\n</body>\r\n</html>\r\n';

  return (
    <div className="mt-40">
      <Loading isLoading={loading} loader={<BannerSkeleton />}>
        <div
          dangerouslySetInnerHTML={{
            __html: htmlElement
          }}
        />
      </Loading>
    </div>
  );
};

export default Garanti;
