import { IButton } from "@/components/atoms/button/types";

const Button = ({ className, children, variant, ...props }: IButton) => {
  return (
    <button className={`btn btn-${variant} normal-case ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
