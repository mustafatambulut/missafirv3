import Link from "next/link";
import classNames from "classnames";
import { isMobile } from "react-device-detect";

import LetterIcon from "../../../../public/images/letter.svg";

const InboxButton = ({ variant }:{variant:string}) => {
  const iconClass = classNames({
    "scale-150": !isMobile,
    "scale-125": isMobile,
    "fill-white": variant === "dark",
    "fill-darkblue-300": variant === "light"
  });

  return (
    <Link href="/inbox">
      <LetterIcon className={iconClass} />
    </Link>
  );
};

export default InboxButton;
