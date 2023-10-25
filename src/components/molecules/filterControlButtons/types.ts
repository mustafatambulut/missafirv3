export interface IFilterControlButtons {
  handleClear?: () => void;
  applyFilter: () => void;
  handleCancel?: () => void;
  filteredCount: number;
  closeDropdown: null | any;
  closeModal: null | any;
  isApplyDisabled?: boolean;
  isClearDisabled?: boolean;
  isInAllFilters?: boolean;
}
