export interface ITestimonial {
  header: ITestimonialsHeader;
  body: ITestimonialsBody[];
}

export interface ITestimonialsHeader {
  id: number;
  title: string;
  description: string;
}

export interface ITestimonialsBody {
  id: number;
  header_label: string;
  header_image: string;
  info: string;
  title: string;
  description: string;
  footer_desc: string;
  author: string;
}

export interface ICardComponent {
  item: {
    info: string;
    header_image: string;
    footer_desc: string;
  };
}
