import React from "react";

import { getDummyDataByType } from "@/utils/helper";

import Image from "next/image";
import Menu from "@/components/molecules/menu";
import Button from "@/components/atoms/button";
import SubFooter from "@/components/atoms/subFooter";

import HeartIcon from "../../../../public/images/heart-white.svg";
import YoutubeIcon from "../../../../public/images/youtube-icon.svg";
import TwitterIcon from "../../../../public/images/twitter-icon.svg";
import FacebookIcon from "../../../../public/images/facebook-icon.svg";
import LinkedinIcon from "../../../../public/images/linkedin-icon.svg";
import InstagramIcon from "../../../../public/images/instagram-icon.svg";

const Footer = async () => {
  //const links = await getMenuByComponent(FOOTER_MENU);
  const dummyMenuItems = getDummyDataByType("dummyMenuItems");
  return (
    <div className="">
      {/*<footer className="flex h-28 p-3 items-center justify-center bg-indigo-400 text-white">*/}
      {/*  <Menu links={links} />*/}
      {/*</footer>*/}
      <footer className="footer border-t px-10 pt-20 pb-10 lg:flex">
        <div className="w-full flex flex-col items-center lg:block lg:w-[327px] ">
          <a href="/">
            <Image
              src="/images/missafir-logo-black.svg"
              alt="Logo"
              width={172}
              height={32}
            />
          </a>
          <p className="my-3 text-center lg:text-left">
            Lorem ipsum dolor sit amet. Et saepe omnis sit architecto repellat
            qui culpa nihil sit impedit
          </p>
          <Button variant="primary">
            <HeartIcon className="mr-2 fill-white" />
            <span>Become a homeowner</span>
          </Button>
          <div className="flex justify-between w-full lg:w-3/4 mt-8">
            <a href="#" className="rounded-full bg-grey-50 p-1">
              <FacebookIcon className="m-0" />
            </a>
            <a href="#" className="rounded-full bg-grey-50 p-1">
              <InstagramIcon />
            </a>
            <a href="#" className="rounded-full bg-grey-50 p-1">
              <LinkedinIcon />
            </a>
            <a href="#" className="rounded-full bg-grey-50 p-1">
              <TwitterIcon />
            </a>
            <a href="#" className="rounded-full bg-grey-50 p-1">
              <YoutubeIcon />
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:pl-14">
          <Menu isCollapsable={false} links={dummyMenuItems} />
        </div>
      </footer>
      {/* @ts-expect-error Server Component */}
      <SubFooter className="flex justify-between bg-gray-50 text-xs" />
    </div>
  );
};

export default Footer;
