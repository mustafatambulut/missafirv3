import { get, map } from "lodash";
import { isValidUrl } from "@/utils/helper";

import { IPropertyCard } from "@/components/molecules/propertyCard/types";

import Typography from "@/components/atoms/typography/Typography";

const PropertyCard = ({ className = "", property }: IPropertyCard) => {
  return (
    <div className={`mb-10 lg:mb-0 ${className}`}>
      <div className="shadow-[0px_1px_20px_0px_#00000014] rounded-2xl">
        {get(property, "image") && isValidUrl(get(property, "image")) && (
          <img
            src={get(property, "image")}
            className="rounded-t-2xl object-cover"
            alt="image"
          />
        )}
        <div className="px-3 py-4 2xl:px-6">
          <Typography element="p" variant="p4" className="text-gray-500">
            {get(property, "date")}
          </Typography>
          <div className="lg:h-16 lg:line-clamp-2 mb-2">
            <Typography element="h6" variant="h6" className="my-2">
              {get(property, "title")}
            </Typography>
          </div>
          <div className="h-20"><Typography element="p" variant="p4" className="text-gray-500 line-clamp-3">
            {get(property, "description")}
          </Typography></div>
          <div className="flex gap-x-5 mt-4">
            <div className="flex gap-x-5 mt-4">
              {map(get(property, "tags"), (tag, key) => (
                <div key={key} className="text-primary">
                  <Typography
                    variant="p3"
                    element="span"
                    className="text-primary">
                    {tag}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
