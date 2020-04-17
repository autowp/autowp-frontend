import { APIPaginator } from '../../services/api.service';
import {
  Injectable,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy
} from '@angular/core';
import { APIUser } from '../../services/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable, Subscription} from 'rxjs';
import {APIComment, APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

interface State {
  itemID: number;
  typeID: number;
  limit: number;
  page: number;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
@Injectable()
export class CommentsComponent implements OnChanges, OnInit, OnDestroy {
  private sub: Subscription;

  public messages: APIComment[] = [];
  public paginator: APIPaginator;
  public user: APIUser;
  private change$ = new BehaviorSubject<State>(null);
  private reload$ = new BehaviorSubject<null>(null);

  @Input() itemID: number;
  @Input() typeID: number;
  @Input() limit: number;
  @Input() page: number;

  constructor(
    private router: Router,
    private commentService: APICommentsService,
    public auth: AuthService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.auth.getUser().pipe(
        tap(user => (this.user = user))
      ),
      this.change$.pipe(
        debounceTime(10),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      ),
      this.reload$
    ])
      .pipe(
        switchMap(data => {
          return this.load(data[1]).pipe(
            map(response => ({
              response,
              user: data[0],
              state: data[1]
            }))
          );
        }),
        map(data => {
          this.messages = data.response.items;
          this.paginator = data.response.paginator;

          if (data.user) {
            this.commentService.postView(data.state.itemID, data.state.typeID).subscribe();
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSent(location: string) {
    if (! this.limit) {
      this.reload$.next(null);
      return;
    }

    this.commentService
      .getCommentByLocation(location, {
        fields: 'page',
        limit: this.limit
      })
      .subscribe(
        response => {
          if (this.page !== response.page) {
            this.router.navigate([], {
              queryParams: { page: response.page },
              queryParamsHandling: 'merge'
            });
          } else {
            this.reload$.next(null);
          }
        },
        response => this.toastService.response(response)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.change$.next({
      itemID: this.itemID,
      typeID: this.typeID,
      limit: this.limit,
      page: this.page,
    });
  }

  public load(state: State): Observable<APICommentGetResponse> {
    if (!state.typeID || !state.itemID) {
      return EMPTY;
    }

    return this.commentService.getComments({
      type_id: state.typeID,
      item_id: state.itemID,
      no_parents: true,
      fields: 'user.avatar,user.gravatar,replies,text_html,vote,user_vote',
      order: 'date_asc',
      limit: state.limit ? state.limit : null,
      page: state.page
    });
  }
}
