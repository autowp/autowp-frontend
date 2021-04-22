import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TwinsService, APITwinsBrand } from './twins.service';

@Component({
  selector: 'app-twins-sidebar',
  templateUrl: './sidebar.component.html'
})
export class TwinsSidebarComponent implements OnInit, OnDestroy {
  @Input() selected: string[] = [];
  private sub: Subscription;
  public brands: APITwinsBrand[] = [];

  constructor(
    private twins: TwinsService
  ) {}

  ngOnInit(): void {
    this.sub = this.twins.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  active(item: APITwinsBrand): boolean {
    return this.selected.indexOf(item.catname) !== -1;
  }
}
