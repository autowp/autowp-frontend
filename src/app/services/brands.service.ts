export interface APIBrandsGetResponse {
  icons: string;
  items: APIBrandsLines;
}

export type APIBrandsLines = APIBrandsChar[][];

export interface APIBrandsChar {
  brands: APIBrandsBrand[];
  char: string;
  id: number;
}

export interface APIBrandsBrand {
  catname: string;
  cssClass?: string;
  id: number;
  logo_id: number;
  name: string;
  newCars: number;
  totalCars: number;
  totalPictures: number;
  url: string;
}
