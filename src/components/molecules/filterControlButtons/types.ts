export interface IFilterControlButtons {
  handleClear?: () => void;
  applyFilter: () => void;
  handleCancel?: () => void;
  filteredCount: number;
}
