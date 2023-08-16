"use client";

import { IFilterControlButtons } from "@/components/molecules/filterControlButtons/types";

import Button from "@/components/atoms/button/Button";

const FilterControlButtons = ({
  handleClear,
  applyFilter,
  handleCancel,
  filteredCount
}: IFilterControlButtons) => {
  const renderButtons = () => {
    return (
      <Button
        onClick={handleClear || handleCancel}
        variant="btn-link"
        className="text-primary bg-transparent shadow-none border-none">
        {handleClear ? "Clear" : "Cancel"}
      </Button>
    );
  };

  return (
    <div className="flex justify-end w-full mt-4">
      {renderButtons()}
      <Button onClick={applyFilter} className="ml-2" variant="btn-primary">
        <div>Show {filteredCount} stays</div>
      </Button>
    </div>
  );
};

export default FilterControlButtons;
