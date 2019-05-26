import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

export interface APIIndexBrandsBrand {
  name: string;
  catname: string;
  cars_count: number;
  new_cars_count: number;
  new_cars_url: string;
}

interface APIIndexBrandsResponse {
  brands: APIIndexBrandsBrand[];
  total: number;
}

@Component({
  selector: 'app-index-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
@Injectable()
export class IndexBrandsComponent implements OnInit, OnDestroy {
  public brands: APIIndexBrandsResponse;
  public more = 0;
  private sub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.http.get<APIIndexBrandsResponse>('/api/index/brands').subscribe(response => {
      this.brands = response;
      this.more = this.brands ? this.brands.total - this.brands.brands.length : 0;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
