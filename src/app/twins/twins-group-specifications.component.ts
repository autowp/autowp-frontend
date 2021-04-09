import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription, of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-twins-group-specifications',
  templateUrl: './twins-group-specifications.component.html'
})
@Injectable()
export class TwinsGroupSpecificationsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public canEdit = false;
  public resultHtml = '';
  private aclSub: Subscription;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private api: APIService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .isAllowed(Resource.CAR, Privilege.EDIT)
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('group'), 10)),
        distinctUntilChanged(),
        debounceTime(10),
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
        ))
      )
      .subscribe(data => {
        this.group = data.group;
        this.resultHtml = data.specsHtml;

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
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.aclSub.unsubscribe();
  }
}
