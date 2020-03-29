import {
  OnChanges,
  OnInit,
  Injectable,
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import { APIItem } from '../../../services/item';
import {ToastsService} from '../../../toasts/toasts.service';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-cars-specifications-editor-result',
  templateUrl: './result.component.html'
})
@Injectable()
export class CarsSpecificationsEditorResultComponent
  implements OnInit, OnChanges {
  @Input() item: APIItem;
  public loading = 0;
  public resultHtml = '';

  constructor(private api: APIService, private toastService: ToastsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.load();
    }
  }

  private load() {
    this.loading++;
    this.api
      .request('GET', 'item/' + this.item.id + '/specifications', {
        responseType: 'text'
      })
      .subscribe(
        response => {
          this.resultHtml = response;
          this.loading--;
        },
        response => {
          this.toastService.response(response);
          this.loading--;
        }
      );
  }
}
