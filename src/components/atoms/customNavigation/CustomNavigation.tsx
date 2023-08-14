import NextIcon from "../../../../public/images/secondary-arrow-right.svg";
import PreviousIcon from "../../../../public/images/secondary-arrow-left.svg";

const CustomNavigation = () => {
  return (
    <>
      <div className="experience-slider swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <PreviousIcon className="fill-blue-700" />
      </div>
      <div className="experience-slider swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <NextIcon className="fill-blue-700" />
      </div>
    </>
  );
};

export default CustomNavigation;
