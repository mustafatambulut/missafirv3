export interface IDateDrawer {
  onClick: void;
  className?: string;
  booking: {
    startDate?: string;
    endDate?: string;
  };
}
