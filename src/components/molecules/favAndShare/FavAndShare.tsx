import { getLocation } from "@/utils/helper";
import { IFavAndShare } from "@/components/molecules/favAndShare/types";

import Button from "@/components/atoms/button/Button";

import ShareIcon from "../../../../public/images/share.svg";
import FavoriteIcon from "../../../../public/images/favorite.svg";

const FavAndShare = ({ className = "" }: IFavAndShare) => {
  return (
    <div className={`absolute right-10 top-10 ${className}`}>
      <div className="flex justify-center">
        {/*todo: favori ekleme özelliği tamamlanacak*/}
        <Button
          onClick={() => alert("favorite")}
          variant="btn-ghost"
          className="hover:bg-transparent focus:outline-0 border-none h-2 px-1">
          <span className="flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full">
            <FavoriteIcon className="fill-transparent stroke-black" />
          </span>
        </Button>
        {/*todo: share butonu event'i eklenmesi gerek*/}
        <Button
          onClick={() => navigator.clipboard.writeText(getLocation("href"))}
          variant="btn-ghost"
          className="hover:bg-transparent focus:outline-0 border-none h-2 px-1">
          <span className="flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full">
            <ShareIcon />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default FavAndShare;
