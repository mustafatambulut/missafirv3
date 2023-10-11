import NextIcon from "../../../../public/images/next_arrow.svg";
import PreviousIcon from "../../../../public/images/prev_arrow.svg";

const CustomNavigation = () => {
  return (
    <>
      <div className="experience-slider swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden bg-none p-0 hidden lg:flex">
        <PreviousIcon className="fill-blue-700" />
      </div>
      <div className="experience-slider swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden bg-none p-0 hidden lg:flex">
        <NextIcon className="fill-blue-700" />
      </div>
    </>
  );
};

export default CustomNavigation;
