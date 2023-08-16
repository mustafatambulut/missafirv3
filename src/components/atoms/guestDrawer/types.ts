export interface IGuestDrawer {
  onClick: void;
  className?: string;
  guest: {
    adults: number;
    kids: number;
    pets: number;
  };
}
