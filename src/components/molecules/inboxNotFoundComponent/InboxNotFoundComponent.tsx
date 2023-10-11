"use client";
import Cancelled from "../../../../public/images/cancelled.svg";
import Typography from "@/components/atoms/typography/Typography";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/redux/hooks";
import { changeNotFound, changeSelectedThreadId, updateThreadDetails } from "@/redux/features/inboxSlice/inboxSlice";
import { useRouter, useSearchParams } from "next/navigation";

const InboxNotFoundComponent = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClickBack = () => {
    if (searchParams.has("id")) {
      router.replace("/inbox", undefined, { shallow: true });
    }
    setTimeout(() => {dispatch(updateThreadDetails(null));
      dispatch(changeSelectedThreadId(null));
      dispatch(changeNotFound(false));},500)
  };
  return (
    <div className="flex-1 lg:pl-5">
      <div className="rounded-xl bg-white justify-center items-center w-full h-[25rem] mt-[5rem] lg:mt-0 lg:h-full flex flex-col gap-y-5">
        <Cancelled className="fill-primary scale-150" />
        <Typography variant="p1" element="p" className="text-primary">
          {t("thread_not_found")}
        </Typography>
        <div onClick={handleClickBack} className="cursor-pointer lg:hidden">
          <Typography variant="p1" element="p" className="text-primary underline">
            {t("go_back")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default InboxNotFoundComponent;
