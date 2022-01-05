import { Component} from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import {Observable, of} from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-twins-group-specifications',
  templateUrl: './twins-group-specifications.component.html'
})
export class TwinsGroupSpecificationsComponent {
  public result$: Observable<{group: APIItem, specsHtml: string}> = this.route.paramMap
    .pipe(
      map(params => parseInt(params.get('group'), 10)),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(group => {
        if (!group) {
          return of(null as APIItem);
        }
        return this.itemService.getItem(group, {
          fields: 'name_text,name_html'
        });
      }),
      switchMap(group => this.api.request(
        'GET',
        'item/' + group.id + '/child-specifications',
        {
          responseType: 'text'
        }
      ).pipe(
        map(specsHtml => ({
          group,
          specsHtml
        }))
      )),
      tap(data => {
        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              nameTranslated: $localize `Specifications of ${data.group.name_text}`,
              pageId: 27
            }),
          0
        );
      })
    );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private api: APIService
  ) {}
}
