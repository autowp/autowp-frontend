import { HttpClient } from '@angular/common/http';
import { Input, Component, Injectable, EventEmitter, Output } from '@angular/core';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-comments-form',
  templateUrl: './form.component.html'
})
@Injectable()
export class CommentsFormComponent {
  @Input() parentID: number;
  @Input() itemID: number;
  @Input() typeID: number;
  @Input() resolve = false;
  @Output() sent = new EventEmitter<string>();

  public invalidParams: any = {};
  public form = {
    message: '',
    moderator_attention: false
  };

  constructor(private http: HttpClient, private toastService: ToastsService) {}

  public sendMessage() {
    this.invalidParams = {};

    this.http
      .post<void>(
        '/api/comment',
        {
          type_id: this.typeID,
          item_id: this.itemID,
          parent_id: this.parentID,
          moderator_attention: this.form.moderator_attention ? 1 : 0,
          message: this.form.message,
          resolve: this.resolve ? 1 : 0
        },
        {
          observe: 'response'
        }
      )
      .subscribe(
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
}
