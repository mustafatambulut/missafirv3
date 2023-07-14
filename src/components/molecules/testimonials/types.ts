export interface ITestimonials {
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
