import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {APIItem, GetSpecificationsRequest} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  imports: [AsyncPipe],
  selector: 'app-cars-specifications-editor-result',
  templateUrl: './result.component.html',
})
export class CarsSpecificationsEditorResultComponent {
  private readonly attrsClient = inject(AttrsClient);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly languageService = inject(LanguageService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  private readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly html$ = this.item$.pipe(
    switchMap((item) =>
      item
        ? this.attrsClient.getSpecifications(
            new GetSpecificationsRequest({itemId: item.id, language: this.languageService.language}),
          )
        : EMPTY,
    ),
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    map((response) => this.sanitizer.bypassSecurityTrustHtml(response.html)),
  );
}
