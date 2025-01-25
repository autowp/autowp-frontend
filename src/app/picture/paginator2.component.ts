import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PicturesPages} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-picture-paginator2',
  templateUrl: './paginator2.component.html',
})
export class PicturePaginator2Component {
  @Input() paginator: null | PicturesPages | undefined = null;
  @Input() prefix: string[] = [];

  protected format(page: number, count: number) {
    const size = Math.max(2, count.toString().length);

    return page.toString().padStart(size, '0');
  }
}
