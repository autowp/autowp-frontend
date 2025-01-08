import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-moder-items-too-big',
  templateUrl: './too-big.component.html',
})
export class ModerItemsTooBigComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly items$: Observable<APIItem[]> = this.itemsClient
    .list(
      new ListItemsRequest({
        fields: new ItemFields({childsCount: true, nameHtml: true}),
        language: this.languageService.language,
        limit: 100,
        order: ListItemsRequest.Order.CHILDS_COUNT,
      }),
    )
    .pipe(map((response) => response.items || []));

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 131,
        }),
      0,
    );
  }
}
