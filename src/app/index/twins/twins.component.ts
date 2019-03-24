import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

interface APIIndexTwinsBrand {
  id: number;
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
@Injectable()
export class IndexTwinsComponent implements  OnInit, OnDestroy {
  public twins: APIIndexTwinsResponse;
  private sub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.http.get<APIIndexTwinsResponse>('/api/index/twins').subscribe(response => {
      this.twins = response;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
