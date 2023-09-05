export interface IImageCarousel {
  images: Images[];
  width?: number;
  height?: number;
  className?: string;
  imageClass?: string;
}

export interface IPhotosComponent {
  images: Images[];
  isModal: boolean;
}

export interface Images {
  path: string;
  path_extra?: string;
  caption: string;
}
