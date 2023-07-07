import { map } from "lodash";
import Image from "next/image";
import ReactFastMarquee from "react-fast-marquee";
import { IMarquee } from "@/components/atoms/marquee/types";

const Marquee = ({
  items,
  direction = "left",
  speed = 50,
  className = ""
}: IMarquee) => {
  return (
    <ReactFastMarquee speed={speed} direction={direction} className={className}>
      {map(items, (item, index) => (
        <Image
          key={index}
          src={item.image}
          alt="image"
          width={240}
          height={110}
          className="mx-2 rounded shadow"
        />
      ))}
    </ReactFastMarquee>
  );
};

export default Marquee;
