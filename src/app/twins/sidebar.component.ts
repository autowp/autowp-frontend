import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {TwinsService, APITwinsBrand} from './twins.service';

@Component({
  selector: 'app-twins-sidebar',
  templateUrl: './sidebar.component.html',
})
export class TwinsSidebarComponent {
  @Input() selected: string[] = [];
  public brands$: Observable<APITwinsBrand[]> = this.twins.getBrands();

  constructor(private twins: TwinsService) {}

  active(item: APITwinsBrand): boolean {
    return this.selected.indexOf(item.catname) !== -1;
  }
}
