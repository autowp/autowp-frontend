import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddCommentRequest, CommentsType} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {BehaviorSubject, Subscription} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [FormsModule, InvalidParamsPipe],
  selector: 'app-comments-form',
  standalone: true,
  templateUrl: './form.component.html',
})
export class CommentsFormComponent implements OnInit, OnDestroy {
  private readonly comments = inject(CommentsClient);
  private readonly toastService = inject(ToastsService);

  @Input() parentID?: string;
  @Input() itemID?: string;
  @Input() typeID?: CommentsType;
  @Output() sent = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<null | string>();

  @Input() set resolve(resolve: boolean) {
    this.resolve$.next(resolve);
  }
  private readonly resolve$ = new BehaviorSubject<boolean | null>(null);
  private resolveSub?: Subscription;

  protected invalidParams: InvalidParams = {};
  protected readonly form = {
    message: '',
    moderator_attention: false,
  };

  protected sendMessage() {
    this.invalidParams = {};

    this.resolve$
      .pipe(
        take(1),
        switchMap((resolve) =>
          this.comments.add(
            new AddCommentRequest({
              itemId: '' + this.itemID,
              message: this.form.message,
              moderatorAttention: !!this.form.moderator_attention,
              parentId: this.parentID ? '' + this.parentID : '',
              resolve: !!resolve,
              typeId: this.typeID,
            }),
          ),
        ),
      )
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof GrpcStatusEvent) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          } else {
            this.toastService.handleError(response);
          }
        },
        next: (response) => {
          this.form.message = '';
          this.form.moderator_attention = false;

          this.sent.emit(response.id);
        },
      });
  }

  protected cancel() {
    this.canceled.emit(null);
  }

  ngOnInit(): void {
    this.resolveSub = this.resolve$
      .pipe(
        tap((resolve) => {
          if (resolve && this.form.message.length <= 0) {
            this.form.message = 'Fixed';
          }
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.resolveSub) {
      this.resolveSub.unsubscribe();
    }
  }
}
