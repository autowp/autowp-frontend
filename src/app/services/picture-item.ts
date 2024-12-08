import {APIItem} from './item';
import {APIPicture} from './picture';

export interface APIPictureItem {
  area: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  item: APIItem;
  item_id: number;
  perspective_id: number;
  picture?: APIPicture;
  picture_id: number;
  type: number;
}
