export interface IListingSeoContent {
  lang: string;
  content: Content;
}

export interface Content {
  data: {
    data: {
      items: Item[];
    };
  };
}

export interface Item {
  title: string;
  slug: string | null;
  pictures: Picture;
  city: {
    name: string;
  };
  space: number | string;
  price: {
    final: number | string;
    average_daily_price: number | string;
  };
  district: {
    name: string;
  };
  rooms_bedrooms_count: number | string;
  rooms_bathrooms_count: number | string;
}

export interface Picture {
  path: string;
  caption: string;
}
