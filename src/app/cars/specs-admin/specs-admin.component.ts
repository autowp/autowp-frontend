import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {APIUser, AttrUserValue, AttrUserValuesFields, AttrUserValuesRequest} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '@services/api.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {getUnitAbbrTranslation} from '@utils/translations';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIAttrsService} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

interface AttrUserValueListItem {
  path$: Observable<string[]>;
  unitAbbr$: Observable<null | string | undefined>;
  user$: Observable<APIUser | null>;
  userValue: AttrUserValue;
}

@Component({
  imports: [NgbTooltip, UserComponent, FormsModule, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-cars-specs-admin',
  standalone: true,
  templateUrl: './specs-admin.component.html',
})
export class CarsSpecsAdminComponent implements OnInit {
  private readonly api = inject(APIService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly userService = inject(UserService);

  private readonly attrsClient = inject(AttrsClient);
  private readonly languageService = inject(LanguageService);
  private readonly attrsService = inject(APIAttrsService);

  private readonly reload$ = new BehaviorSubject<void>(void 0);

  protected readonly move = {
    item_id: null,
  };

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('item_id') || ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly data$: Observable<{
    items: AttrUserValueListItem[];
  }> = combineLatest([this.itemID$, this.reload$]).pipe(
    switchMap(([itemID]) =>
      this.attrsClient.getUserValues(
        new AttrUserValuesRequest({
          fields: new AttrUserValuesFields({valueText: true}),
          itemId: itemID,
          language: this.languageService.language,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => ({
      items: (response.items || []).map((userValue) => {
        const attr$ = this.attrsService.getAttribute$(userValue.attributeId);
        return {
          path$: this.attrsService.getPath$(userValue.attributeId),
          unitAbbr$: attr$.pipe(map((attr) => (attr?.unitId ? getUnitAbbrTranslation(attr.unitId) : null))),
          user$: this.userService.getUser$(userValue.userId),
          userValue,
        };
      }),
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 103}), 0);
  }

  protected deleteValue(value: AttrUserValueListItem) {
    this.api
      .request(
        'DELETE',
        'attr/user-value/' + value.userValue.attributeId + '/' + value.userValue.itemId + '/' + value.userValue.userId,
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.reload$.next();
        },
      });
  }

  protected moveValues(itemID: string) {
    this.api
      .request<void>('PATCH', 'attr/user-value', {
        body: {
          item_id: this.move.item_id,
        },
        params: {
          item_id: itemID,
        },
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.reload$.next();
        },
      });
  }
}
