import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, GetSpecificationsRequest, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {AttrsClient, ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  imports: [AsyncPipe],
  selector: 'app-twins-group-specifications',
  templateUrl: './specifications.component.html',
})
export class TwinsGroupSpecificationsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly attrsClient = inject(AttrsClient);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly id$: Observable<string> = this.route.parent!.paramMap.pipe(
    map((params) => params.get('group')),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
    switchMap((id) => {
      if (!id) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(id);
    }),
  );

  protected readonly html$ = this.id$.pipe(
    switchMap((id) =>
      id
        ? this.attrsClient.getChildSpecifications(
            new GetSpecificationsRequest({itemId: id, language: this.languageService.language}),
          )
        : EMPTY,
    ),
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    map((response) => this.sanitizer.bypassSecurityTrustHtml(response.html)),
  );

  protected readonly group$: Observable<APIItem> = this.id$.pipe(
    switchMap((id) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameText: true}),
          id,
          language: this.languageService.language,
        }),
      ),
    ),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 27,
            title: $localize`Specifications of ${group.nameText}`,
          }),
        0,
      );
    }),
  );
}
