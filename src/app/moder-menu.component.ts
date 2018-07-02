import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ACLService } from './services/acl.service';
import { PictureService } from './services/picture';
import { CommentService } from './services/comment';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

interface MenuItem {
  routerLink: string[];
  queryParams?: { [key: string]: string };
  label: string;
  count?: number;
  icon: string;
}

@Component({
  selector: 'app-moder-menu',
  templateUrl: './moder-menu.component.html'
})
@Injectable()
export class ModerMenuComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [];
  private sub: Subscription;

  constructor(
    public auth: AuthService,
    public acl: ACLService,
    private pictureService: PictureService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.sub = combineLatest(
      this.acl.inheritsRole('moder'),
      this.acl.inheritsRole('pages-moder'),
      this.pictureService.getInboxSize(),
      this.commentService.getAttentionCommentsCount(),
      (isModer, isPagesModer, inboxCount, attentionItemCount) => ({
        isModer,
        isPagesModer,
        inboxCount,
        attentionItemCount
      })
    )
      .pipe(
        tap(data => {
          this.items = [];

          if (!data.isModer) {
            return;
          }

          this.items.push({
            routerLink: ['/moder/pictures'],
            queryParams: {
              order: '1',
              status: 'inbox'
            },
            label: 'moder-menu/inbox',
            count: data.inboxCount,
            icon: 'fa fa-th'
          });

          this.items.push({
            routerLink: ['/moder/comments'],
            queryParams: {
              moderator_attention: '1'
            },
            label: 'page/110/name',
            count: data.attentionItemCount,
            icon: 'fa fa-comment'
          });

          if (data.isPagesModer) {
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
