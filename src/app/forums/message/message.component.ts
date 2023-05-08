import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EMPTY, Subscription} from 'rxjs';
import {distinctUntilChanged, switchMap, map, catchError, tap} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {GetMessagePageRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {MESSAGES_PER_PAGE} from '../forums.module';

@Component({
  selector: 'app-forums-message',
  template: '<h2>Redirecting …</h2>',
})
export class MessageComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  constructor(
    private readonly router: Router,
    private readonly commentsClient: CommentsClient,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => params.get('message_id')),
        distinctUntilChanged(),
        switchMap((messageId) =>
          this.commentsClient.getMessagePage(new GetMessagePageRequest({messageId, perPage: MESSAGES_PER_PAGE}))
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        tap((message) => {
          this.router.navigate(['/forums/topic', message.itemId], {
            replaceUrl: true,
            queryParams: {
              page: message.page,
            },
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
