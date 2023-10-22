import {Component, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
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
  private readonly item$ = new BehaviorSubject<APIItem>(null);

  protected readonly html$ = this.item$.pipe(
    switchMap((item) =>
      this.api.request('GET', 'item/' + item.id + '/specifications', {
        responseType: 'text',
      }),
    ),
  );

  constructor(private readonly api: APIService) {}
}
