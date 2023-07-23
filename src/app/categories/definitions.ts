import {APIItem} from '@services/item';

export interface PathItem {
  childs: APIItem[];
  item: APIItem;
  loaded: boolean;
  parent_id: number;
  routerLink: string[];
}
