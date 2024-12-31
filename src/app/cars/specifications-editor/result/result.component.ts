import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {APIItem, GetSpecificationsRequest} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  imports: [AsyncPipe],
  selector: 'app-cars-specifications-editor-result',
  standalone: true,
  templateUrl: './result.component.html',
})
export class CarsSpecificationsEditorResultComponent {
  private readonly attrsClient = inject(AttrsClient);
  private readonly sanitizer = inject(DomSanitizer);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  private readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly html$ = this.item$.pipe(
    switchMap((item) =>
      item ? this.attrsClient.getSpecifications(new GetSpecificationsRequest({itemId: item.id})) : EMPTY,
    ),
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    map((response) => this.sanitizer.bypassSecurityTrustHtml(response.html)),
  );
}
