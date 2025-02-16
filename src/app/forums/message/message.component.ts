import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetMessagePageRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {EMPTY, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {MESSAGES_PER_PAGE} from '../forums.module';

@Component({
  selector: 'app-forums-message',
  standalone: true,
  template: '<h2>Redirecting …</h2>',
})
export class MessageComponent implements OnDestroy, OnInit {
  readonly #router = inject(Router);
  readonly #commentsClient = inject(CommentsClient);
  readonly #route = inject(ActivatedRoute);
  readonly #toastService = inject(ToastsService);

  #routeSub?: Subscription;

  ngOnInit(): void {
    this.#routeSub = this.#route.paramMap
      .pipe(
        map((params) => params.get('message_id')),
        distinctUntilChanged(),
        switchMap((messageId) =>
          messageId
            ? this.#commentsClient.getMessagePage(new GetMessagePageRequest({messageId, perPage: MESSAGES_PER_PAGE}))
            : EMPTY,
        ),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
        tap((message) => {
          this.#router.navigate(['/forums/topic', message.itemId], {
            queryParams: {
              page: message.page,
            },
            replaceUrl: true,
          });
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.#routeSub) {
      this.#routeSub.unsubscribe();
    }
  }
}
