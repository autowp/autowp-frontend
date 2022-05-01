import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EMPTY, Subscription} from 'rxjs';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError, tap} from 'rxjs/operators';
import { ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-message',
  template: '<h2>Redirecting …</h2>'
})
export class MessageComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  constructor(
    private router: Router,
    private forumService: ForumsService,
    private route: ActivatedRoute,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.pipe(
      map(params => parseInt(params.get('message_id'), 10)),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(messageID => this.forumService.getMessageStateParams(messageID)),
      catchError(response => {
        this.toastService.response(response);
        return EMPTY;
      }),
      tap(message => {
        this.router.navigate(['/forums/topic', message.topic_id], {
          replaceUrl: true,
          queryParams: {
            page: message.page
          }
        });
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
