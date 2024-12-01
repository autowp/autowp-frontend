import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {APIItem} from '@grpc/spec.pb';

@Component({
  imports: [AsyncPipe],
  selector: 'app-cars-specifications-editor-result',
  standalone: true,
  templateUrl: './result.component.html',
})
export class CarsSpecificationsEditorResultComponent {
  private readonly api = inject(APIService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  private readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly html$ = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.api.request$('GET', 'item/' + item.id + '/specifications', {
            responseType: 'text',
          })
        : EMPTY,
    ),
  );
}
