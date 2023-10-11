import Image from "next/image";
import { get, map } from "lodash";

import { ISocialMenu } from "@/components/atoms/socialMenu/types";

import Button from "@/components/atoms/button/Button";

const SocialMenu = ({ links, className = "" }: ISocialMenu) => {
  return (
    <div>
      <ul className={`flex ${className}`}>
        {map(links, (link, key) => (
          <li key={key}>
            <Button
              target="_blank"
              variant="btn-link"
              className="px-1"
              link={get(link, "attributes.link")}>
              <Image
                priority
                src={get(link, "attributes.image") || "/"}
                width="0"
                height="0"
                className="w-8 h-auto bg-gray-50 p-1 rounded-full"
                alt="image"
              />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMenu;
