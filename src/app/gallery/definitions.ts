import { APIImage } from '../services/api.service';

export interface Rectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface APIGalleryResponse {
  pages: number;
  count: number;
  page: number;
  items: APIGalleryItem[];
}

export interface APIGalleryItemArea {
  area: Rectangle;
  name: string;
  styles?: {};
}

export interface APIGalleryItem {
  id: number;
  identity: string;
  sourceUrl: string;
  crop: {
    crop: Rectangle;
    src: string;
    width: number;
    height: number;
  };
  full: APIImage;
  messages: number;
  newMessages: number;
  name: string;
  filesize: number;
  areas: APIGalleryItemArea[];
}

export interface APIGallery {
  page: number;
  pages: number;
  count: number;
  items: APIGalleryItem[];
  status: string;
}

