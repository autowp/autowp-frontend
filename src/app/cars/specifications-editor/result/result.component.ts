import {
  OnChanges,
  OnInit,
  Injectable,
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import { APIItem } from '../../../services/item';
import { HttpClient } from '@angular/common/http';
import {ToastsService} from '../../../toasts/toasts.service';

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

  constructor(private http: HttpClient, private toastService: ToastsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.load();
    }
  }

  private load() {
    this.loading++;
    this.http
      .get('/api/item/' + this.item.id + '/specifications', {
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
