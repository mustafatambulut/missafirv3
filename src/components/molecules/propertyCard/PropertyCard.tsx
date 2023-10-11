"use client";
import Image from "next/image";
import { get, map } from "lodash";
import { useRouter } from "next/navigation";

import { isValidUrl } from "@/utils/helper";
import { IPropertyCard } from "@/components/molecules/propertyCard/types";

import Card from "@/components/atoms/card/Card";
import Typography from "@/components/atoms/typography/Typography";

const PropertyCard = ({ className = "", property }: IPropertyCard) => {
  const router = useRouter();

  return (
    <Card className={`mb-10 lg:mb-0 ${className}`}>
      <div className="shadow-[0px_1px_20px_0px_#00000014] rounded-2xl">
        <div className="w-full h-60 relative">
          {get(property, "image") && isValidUrl(get(property, "image")) && (
            <Image
              onClick={() => router.push(get(property, "link") || "#")}
              src={get(property, "image")}
              alt="image"
              fill={true}
              className="rounded-t-2xl object-cover"
            />
          )}
        </div>
        <div className="px-3 py-4">
          <Typography element="p" variant="p4" className="text-gray-500">
            {get(property, "date")}
          </Typography>
          <Typography element="h6" variant="h6" className="my-2">
            {get(property, "title")}
          </Typography>
          <Typography element="p" variant="p4" className="text-gray-500">
            {get(property, "description")}
          </Typography>
          <div className="flex gap-x-5 mt-4">
            {map(get(property, "tags"), (tag, key) => (
              <Typography
                key={key}
                element="span"
                variant="p3"
                className="text-primary">
                <div onClick={() => router.push("/")} className="text-primary">
                  {tag}
                </div>
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
