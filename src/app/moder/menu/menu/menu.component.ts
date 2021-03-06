import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {PictureService} from '../../../services/picture';
import {tap} from 'rxjs/operators';
import {APICommentsService} from '../../../api/comments/comments.service';

interface MenuItem {
  routerLink: string[];
  queryParams?: { [key: string]: string };
  label: string;
  count?: number;
  icon: string;
}

@Component({
  selector: 'app-moder-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  public items: MenuItem[] = [];
  private sub: Subscription;

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private pictureService: PictureService,
    private commentService: APICommentsService
  ) {}

  ngOnInit() {
    this.sub = combineLatest([
      this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE),
      this.acl.isAllowed(Resource.PAGES, Privilege.MODERATE),
      this.pictureService.getInboxSize(),
      this.commentService.getAttentionCommentsCount()
    ])
      .pipe(
        tap(([isModer, isPagesModer, inboxCount, attentionItemCount]) => {
          this.items = [];

          if (!isModer) {
            return;
          }

          this.items.push({
            routerLink: ['/moder/pictures'],
            queryParams: {
              order: '1',
              status: 'inbox'
            },
            label: 'moder-menu/inbox',
            count: inboxCount,
            icon: 'fa fa-th'
          });

          this.items.push({
            routerLink: ['/moder/comments'],
            queryParams: {
              moderator_attention: '1'
            },
            label: 'page/110/name',
            count: attentionItemCount,
            icon: 'fa fa-comment'
          });

          if (isPagesModer) {
            this.items.push({
              routerLink: ['/moder/pages'],
              label: 'page/68/name',
              icon: 'fa fa-book'
            });
          }

          this.items.push({
            routerLink: ['/moder/items'],
            label: 'page/131/name',
            icon: 'fa fa-car'
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
