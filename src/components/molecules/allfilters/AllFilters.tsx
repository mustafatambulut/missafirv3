"use client";
import { useRef } from "react";
import { isEmpty, isEqual, join, keys, map, omit } from "lodash";
import { useDetectClickOutside } from "react-detect-click-outside";
import { usePathname, useRouter } from "next/navigation";

import useFilter from "@/app/hooks/useFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateFilterData } from "@/redux/features/listingSlice/listingSlice";
import { SEARCHBAR_KEYS } from "@/components/molecules/filterControlButtons/constants";

import AllFiltersHeader from "@/components/molecules/allFiltersHeader/AllFiltersHeader";
import AllFiltersContent from "@/components/molecules/allFiltersContent/AllFiltersContent";
import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";

import "./Allfilters.css";

const AllFilters = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { cleanFilterData } = useFilter();
  const modalButtonRef = useRef<HTMLInputElement | null>(null);
  const filterData = useAppSelector((state) => state.listingReducer.filterData);

  const outsideRef = useDetectClickOutside({
    onTriggered: () => {
      if (typeof window !== "undefined") {
        //@ts-ignore
        window?.all_filters_modal.checked === true && modalButtonTrigger();
      }
    }
  });

  const modalButtonTrigger = () => {
    modalButtonRef.current?.click();
  };

  const checkIsDisabled = () => {
    return isEqual(omit(searchParams,SEARCHBAR_KEYS), omit(filterData,SEARCHBAR_KEYS));
  };

  return (
    <>
      <input
        type="checkbox"
        ref={modalButtonRef}
        id="all_filters_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div
          ref={outsideRef}
          className="no-scrollbar w-full p-0 lg:pt-0 modal-box lg:max-w-5xl rounded-none lg:rounded-2xl h-screen lg:h-[calc(100%-5em)]">
          <div>
            <AllFiltersHeader modalButtonTrigger={modalButtonTrigger} />
            <AllFiltersContent />
          </div>
          <div className="p-5">
            <FilterControlButtons
              isApplyDisabled={checkIsDisabled()}
              isClearDisabled={isEmpty(omit(filterData, SEARCHBAR_KEYS))}
              isInAllFilters={true}
              closeModal={modalButtonTrigger}
              handleClear={() => {
                dispatch(
                  updateFilterData(
                    omit(filterData, keys(omit(filterData, SEARCHBAR_KEYS)))
                  )
                );
                const tempUri: any[] = [];
                const result = cleanFilterData(
                  omit(filterData, keys(omit(filterData, SEARCHBAR_KEYS)))
                );
                map(result, (value, key) => {
                  if (value) return tempUri.push(`${key}=${value}`);
                });

                const queryParams = join(tempUri, "&")
                  ? `${join(tempUri, "&")}`
                  : "";
                router.push(`${pathName}?${queryParams}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFilters;
