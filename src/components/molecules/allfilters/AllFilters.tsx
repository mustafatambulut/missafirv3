"use client";
import { useRef } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import AllFiltersHeader from "@/components/molecules/allFiltersHeader/AllFiltersHeader";
import AllFiltersContent from "@/components/molecules/allFiltersContent/AllFiltersContent";

import "./Allfilters.css";

const AllFilters = () => {
  const modalButtonRef = useRef<HTMLInputElement | null>(null);
  const outsideRef = useDetectClickOutside({
    onTriggered: () => {
      if ((window as any)?.all_filters_modal.checked === true) {
        modalButtonTrigger();
      }
    }
  });

  const modalButtonTrigger = () => {
    modalButtonRef.current?.click();
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
          {/*todo: istenirse, apply - clear butonları buraya gelecek*/}
          {/*<div className="p-5">*/}
          {/*  <FilterControlButtons*/}
          {/*    applyFilter={applyFilter}*/}
          {/*    handleCancel={modalButtonTrigger}*/}
          {/*    filteredCount={size(tempFilteredListings)}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default AllFilters;
