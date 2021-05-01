import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {PictureService} from '../../../services/picture';
import {map} from 'rxjs/operators';
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
      this.pictureService.getInboxSize(),
      this.commentService.getAttentionCommentsCount()
    ])
      .pipe(
        map(([isModer, inboxCount, attentionItemCount]) => {
          if (!isModer) {
            return [];
          }

          return [
            {
              routerLink: ['/moder/pictures'],
              queryParams: {
                order: '1',
                status: 'inbox'
              },
              label: $localize `Inbox`,
              count: inboxCount,
              icon: 'fa fa-th'
            },
            {
              routerLink: ['/moder/comments'],
              queryParams: {
                moderator_attention: '1'
              },
              label: $localize `Comments`,
              count: attentionItemCount,
              icon: 'fa fa-comment'
            },
            {
              routerLink: ['/moder/items'],
              label: $localize `Items`,
              icon: 'fa fa-car'
            }
          ];
        })
      )
      .subscribe(items => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
