import {Component} from '@angular/core';
import { APIService } from '../../services/api.service';

interface APIIndexTwinsBrand {
  id: number;
  name: string;
  catname: string;
  count: number;
  new_count: number;
}

interface APIIndexTwinsResponse {
  brands: APIIndexTwinsBrand[];
  brands_count: number;
}

@Component({
  selector: 'app-index-twins',
  templateUrl: './twins.component.html'
})
export class IndexTwinsComponent {
  public items$ = this.api.request<APIIndexTwinsResponse>('GET', 'index/twins');

  constructor(private api: APIService) {}
}
