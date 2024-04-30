import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-twins-group-specifications',
  templateUrl: './specifications.component.html',
})
export class TwinsGroupSpecificationsComponent {
  protected readonly id$: Observable<string> = this.route.parent!.paramMap.pipe(
    map((params) => params.get('group')),
    distinctUntilChanged(),
    shareReplay(1),
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

  protected readonly html$: Observable<string> = this.id$.pipe(
    switchMap((id) =>
      this.api.request('GET', 'item/' + id + '/child-specifications', {
        responseType: 'text',
      }),
    ),
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly api: APIService,
    private readonly router: Router,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
