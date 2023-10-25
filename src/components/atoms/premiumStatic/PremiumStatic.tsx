"use client";
import Card from "@/components/atoms/card/Card";
import Button from "@/components/atoms/button/Button";
import Typography from "../typography/Typography";

const PremiumStatic = ({
  link,
  title,
  description,
  buttonLabel,
  image
}: any) => {
  return (
    <div className="px-2 lg:px-8 mt-14">
      <Card
        className="text-white rounded-xl p-8 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}>
        <Typography
          variant="h3"
          element="h3"
          className="font-mi-sans-semi-bold">
          {title}
        </Typography>
        <Typography variant="p2" element="p" className="py-4">
          {description}
        </Typography>
        <Button variant="btn-white" className="w-48 text-md" link={link || "#"}>
          {buttonLabel}
        </Button>
      </Card>
    </div>
  );
};

export default PremiumStatic;
