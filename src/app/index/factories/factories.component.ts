import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.http.get<APIIndexFactoriesResponse>('/api/index/factories').subscribe(response => {
      this.factories = response.items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
