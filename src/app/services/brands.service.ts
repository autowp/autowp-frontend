export interface APIBrandsGetResponse {
  items: APIBrandsLines;
  icons: string;
}

export type APIBrandsLines = APIBrandsChar[][];

export interface APIBransLine {
  [key: string]: APIBrandsChar;
}

export interface APIBrandsChar {
  char: string;
  id: number;
  brands: APIBrandsBrand[];
}

export interface APIBrandsBrand {
  catname: string;
  id: number;
  logo_id: number;
  name: string;
  newCars: number;
  new_cars_url: string;
  totalCars: number;
  totalPictures: number;
  url: string;
  cssClass?: string;
}
