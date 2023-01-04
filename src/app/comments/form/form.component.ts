import {Input, Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {AddCommentRequest, CommentsType} from '../../../../generated/spec.pb';
import {BehaviorSubject, Subscription} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';
import {CommentsClient} from '../../../../generated/spec.pbsc';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';

@Component({
  selector: 'app-comments-form',
  templateUrl: './form.component.html',
})
export class CommentsFormComponent implements OnInit, OnDestroy {
  @Input() parentID: number;
  @Input() itemID: number;
  @Input() typeID: CommentsType;
  @Output() sent = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<string>();

  @Input() set resolve(resolve: boolean) {
    this.resolve$.next(resolve);
  }
  private resolve$ = new BehaviorSubject<boolean>(null);
  private resolveSub: Subscription;

  public invalidParams: any = {};
  public form = {
    message: '',
    moderator_attention: false,
  };

  constructor(private comments: CommentsClient) {}

  public sendMessage() {
    this.invalidParams = {};

    this.resolve$
      .pipe(
        take(1),
        switchMap((resolve) =>
          this.comments.add(
            new AddCommentRequest({
              itemId: '' + this.itemID,
              typeId: this.typeID,
              message: this.form.message,
              moderatorAttention: !!this.form.moderator_attention,
              parentId: this.parentID ? '' + this.parentID : '',
              resolve,
            })
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.form.message = '';
          this.form.moderator_attention = false;

          this.sent.emit(response.id);
        },
        error: (response) => {
          const fieldViolations = extractFieldViolations(response);
          this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
        },
      });
  }

  public cancel() {
    this.canceled.emit(null);
  }

  ngOnInit(): void {
    this.resolveSub = this.resolve$
      .pipe(
        tap((resolve) => {
          if (resolve && this.form.message.length <= 0) {
            this.form.message = 'Fixed';
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.resolveSub.unsubscribe();
  }
}
