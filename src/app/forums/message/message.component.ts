import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-message',
  templateUrl: './message.component.html'
})
@Injectable()
export class MessageComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  constructor(
    private router: Router,
    private forumService: ForumsService,
    private route: ActivatedRoute,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params =>
          this.forumService.getMessageStateParams(params.message_id)
        )
      )
      .subscribe(
        message => {
          this.router.navigate(['/forums/topic', message.topic_id], {
            replaceUrl: true,
            queryParams: {
              page: message.page
            }
          });
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
