import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
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
export class IndexTwinsComponent implements  OnInit, OnDestroy {
  public twins: APIIndexTwinsResponse;
  private sub: Subscription;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.sub = this.api.request<APIIndexTwinsResponse>('GET', 'index/twins').subscribe(response => {
      this.twins = response;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
