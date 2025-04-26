import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PicturesPages} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-picture-paginator',
  templateUrl: './paginator.component.html',
})
export class PicturePaginatorComponent {
  readonly paginator = input.required<PicturesPages>();
  readonly prefix = input.required<string[]>();

  protected format(page: number, count: number) {
    const size = Math.max(2, count.toString().length);

    return page.toString().padStart(size, '0');
  }
}
