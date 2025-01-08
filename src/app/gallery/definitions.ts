import {APIImage} from '@services/api.service';

export interface APIGallery {
  count: number;
  items: APIGalleryItem[];
  page: number;
  pages: number;
  status: string;
}

export interface APIGalleryItem {
  areas: APIGalleryItemArea[];
  crop: {
    crop: Rectangle;
    height: number;
    src: string;
    width: number;
  };
  filesize: number;
  full: APIImage;
  id: number;
  identity: string;
  messages: number;
  name: string;
  newMessages: number;
  sourceUrl: string;
}

export interface APIGalleryItemArea {
  area: Rectangle;
  name: string;
  styles?: {
    'height.px': number;
    'left.px': number;
    'top.px': number;
    'width.px': number;
  };
}

export interface APIGalleryResponse {
  count: number;
  items: APIGalleryItem[];
  page: number;
  pages: number;
}

export interface Rectangle {
  height: number;
  left: number;
  top: number;
  width: number;
}
