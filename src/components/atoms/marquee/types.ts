export interface IMarquee {
  direction?: "left" | "right" | "up" | "down";
  speed?: number;
  className?: string;
  items: IMarqueeItem[];
  marqueeItemClassName?: string;
}
export interface IMarqueeItem {
  id: number;
  image: string;
  link: string;
  label: string;
}
