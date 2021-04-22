import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { APIService } from '../../services/api.service';

export interface APIIndexBrandsBrand {
  id: number;
  name: string;
  catname: string;
  cars_count: number;
  new_cars_count: number;
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
export class IndexBrandsComponent implements OnInit, OnDestroy {
  public brands: APIIndexBrandsResponse;
  public more = 0;
  private sub: Subscription;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.sub = this.api.request<APIIndexBrandsResponse>('GET', 'index/brands').subscribe(response => {
      this.brands = response;
      this.more = this.brands ? this.brands.total - this.brands.brands.length : 0;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
