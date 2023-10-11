import { ITypography } from "@/components/atoms/typography/types";

const Typography = ({
  element,
  variant,
  children,
  className = ""
}: ITypography) => {
  const generateClassName = () => {
    switch (variant) {
      case "h1":
        return `text-42 lg:text-54 lg:leading-70 font-mi-sans-semi-bold ${className}`;
      case "h2":
        return `text-34 lg:text-42 lg:leading-50 font-mi-sans-semi-bold ${className}`;
      case "h3":
        return `text-28 lg:text-36 lg:leading-43 font-mi-sans-semi-bold ${className}`;
      case "h4":
        return `text-22 lg:text-28 lg:leading-34 font-mi-sans-semi-bold ${className}`;
      case "h4.1":
        return `text-16 leading-5 ${className}`;
      case "h5":
        return `text-14 lg:text-24 leading-4 font-mi-sans-semi-bold ${className}`;
      case "h5.1":
        return `text-14 leading-4 ${className}`;
      case "h6":
        return `text-12 lg:text-20 leading-14 lg:leading-normal font-mi-sans-semi-bold ${className}`;
      case "h6.1":
        return `text-12 leading-14 lg:leading-normal ${className}`;
      case "p1":
        return `text-18 lg:text-24 ${className}`;
      case "p2":
        return `text-16 lg:text-21 leading-30 lg:leading-7 ${className}`;
      case "p3":
        return `text-14 lg:text-18 leading-6 lg:leading-22 ${className}`;
      case "p4":
        return `text-12 lg:text-16 leading-4 lg:leading-normal ${className}`;
      case "p5":
        return `text-10 lg:text-14 leading-4 lg:leading-normal ${className}`;
      case "p6":
        return `text-12 ${className}`;
      default:
        return `text-16 lg:text-24 ${className}`;
    }
  };
  const generateElement = () => {
    switch (element) {
      case "h1":
        return <h1 className={generateClassName()}>{children}</h1>;
      case "h2":
        return <h2 className={generateClassName()}>{children}</h2>;
      case "h3":
        return <h3 className={generateClassName()}>{children}</h3>;
      case "h4":
        return <h4 className={generateClassName()}>{children}</h4>;
      case "h5":
        return <h5 className={generateClassName()}>{children}</h5>;
      case "h6":
        return <h6 className={generateClassName()}>{children}</h6>;
      case "p":
        return <p className={generateClassName()}>{children}</p>;
      case "label":
        return <label className={generateClassName()}>{children}</label>;
      case "span":
        return <span className={generateClassName()}>{children}</span>;
      case "div":
        return <div className={generateClassName()}>{children}</div>;
      default:
        return <p className={generateClassName()}>{children}</p>;
    }
  };

  return generateElement();
};

export default Typography;
