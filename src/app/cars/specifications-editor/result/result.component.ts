import {Component, Input} from '@angular/core';
import {APIItem} from '../../../services/item';
import {APIService} from '../../../services/api.service';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-cars-specifications-editor-result',
  templateUrl: './result.component.html',
})
export class CarsSpecificationsEditorResultComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  private item$ = new BehaviorSubject<APIItem>(null);

  public html$ = this.item$.pipe(
    switchMap((item) =>
      this.api.request('GET', 'item/' + item.id + '/specifications', {
        responseType: 'text',
      })
    )
  );

  constructor(private api: APIService) {}
}
