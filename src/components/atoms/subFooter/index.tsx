import { ISubFooter } from "@/components/atoms/subFooter/types";

import Image from "next/image";
import HeartIcon from "../../../../public/images/heart-white.svg";

const SubFooter = async ({ className = "" }: ISubFooter) => {
  //const links = await getMenuByComponent(SUB_FOOTER_MENU);
  //const { description } = await getPageDataByComponent(currentPage, SUB_FOOTER);

  return (
    <footer className={`footer footer-center p-5 ${className}`}>
      {/*<p>{description}</p>*/}
      <div className="flex justify-between py-1 w-full flex-col-reverse lg:flex-row">
        <div className="grid grid-rows-1 grid-cols-2 gap-3">
          <div className="flex items-center justify-start">
            <span>Made with</span>
            <HeartIcon className="fill-primary mx-2" />
            <span>in Istanbul</span>
          </div>
          <div className="flex items-center justify-end">
            <span>by</span>
            <Image
              src="/images/missafirtech.svg"
              alt="missafir tech"
              width={95}
              height={12}
            />
          </div>
        </div>
        <div className="grid grid-rows-1 grid-cols-2 gap-4 mb-2 lg:mb-0">
          <a href="#" className="text-grey-500">
            Terms of Use
          </a>
          <a href="#" className="text-grey-500">
            Privacy Policy
          </a>
        </div>
        {/*{links.map(({ attributes }, key: any) => (*/}
        {/*  <MenuItem*/}
        {/*    linkClassName="link link-hover text-white"*/}
        {/*    key={key}*/}
        {/*    item={attributes}*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    </footer>
  );
};

export default SubFooter;
