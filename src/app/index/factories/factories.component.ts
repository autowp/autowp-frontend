import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { APIService } from '../../services/api.service';

export interface APIIndexFactoriesItem {
  id: number;
  name: string;
  count: number;
  new_count: number;
}

interface APIIndexFactoriesResponse {
  items: APIIndexFactoriesItem[];
}

@Component({
  selector: 'app-index-factories',
  templateUrl: './factories.component.html'
})
@Injectable()
export class IndexFactoriesComponent implements  OnInit, OnDestroy {
  public factories: APIIndexFactoriesItem[];
  private sub: Subscription;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.sub = this.api.request<APIIndexFactoriesResponse>('GET', 'index/factories').subscribe(response => {
      this.factories = response.items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
