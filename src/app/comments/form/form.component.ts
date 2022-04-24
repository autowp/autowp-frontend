import {Input, Component, EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';
import {CommentsType} from '../../../../generated/spec.pb';
import {BehaviorSubject, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-comments-form',
  templateUrl: './form.component.html'
})
export class CommentsFormComponent implements OnInit, OnDestroy {
  @Input() parentID: number;
  @Input() itemID: number;
  @Input() typeID: CommentsType;
  @Output() sent = new EventEmitter<string>();
  @Output() canceled = new EventEmitter<string>();

  @Input() set resolve(resolve: boolean) { this.resolve$.next(resolve); };
  private resolve$ = new BehaviorSubject<boolean>(null);
  private resolveSub: Subscription;

  public invalidParams: any = {};
  public form = {
    message: '',
    moderator_attention: false
  };

  constructor(private api: APIService, private toastService: ToastsService) {}

  public sendMessage() {
    this.invalidParams = {};

    this.resolve$.pipe(
      switchMap(resolve => this.api.request<void>(
        'POST',
        'comment',
        {
          body: {
            type_id: this.typeID,
            item_id: this.itemID,
            parent_id: this.parentID,
            moderator_attention: this.form.moderator_attention ? 1 : 0,
            message: this.form.message,
            resolve: resolve ? 1 : 0
          },
          observe: 'response'
        }
      ))
    ).subscribe(
      response => {
        this.form.message = '';
        this.form.moderator_attention = false;

        const location = response.headers.get('Location');

        this.sent.emit(location);
      },
      response => {
        if (response.status === 400) {
          this.invalidParams = response.error.invalid_params;
        } else {
          this.toastService.response(response);
        }
      }
    );
  }

  public cancel() {
    this.canceled.emit(null);
  }

  ngOnInit(): void {
    this.resolveSub = this.resolve$.pipe(
      tap(resolve => {
        if (resolve && this.form.message.length <= 0) {
          this.form.message = 'Fixed';
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.resolveSub.unsubscribe();
  }
}
