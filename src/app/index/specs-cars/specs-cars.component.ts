import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APIItem} from '../../services/item';
import {APIUser} from '../../services/user';
import {chunkBy} from '../../chunk';

interface APIIndexSpecItemsItem extends APIItem {
  contributors: APIUser[];
}

interface APIIndexSpecItemsResponse {
  items: APIIndexSpecItemsItem[];
}

@Component({
  selector: 'app-index-specs-cars',
  templateUrl: './specs-cars.component.html'
})
@Injectable()
export class IndexSpecsCarsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public items: APIIndexSpecItemsItem[][];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.http.get<APIIndexSpecItemsResponse>('/api/index/spec-items').subscribe(response => {
      this.items = chunkBy(response.items, 2);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
