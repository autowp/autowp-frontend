import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PictureService} from '@services/picture';
import {map} from 'rxjs/operators';

import {ThumbnailComponent} from '../../thumbnail/thumbnail/thumbnail.component';

@Component({
  imports: [RouterLink, ThumbnailComponent, AsyncPipe],
  selector: 'app-index-pictures',
  standalone: true,
  templateUrl: './pictures.component.html',
})
export class IndexPicturesComponent {
  private readonly pictureService = inject(PictureService);

  protected readonly items$ = this.pictureService
    .getPictures$({
      accepted_in_days: 3,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
      limit: 4,
      order: 15,
      status: 'accepted',
    })
    .pipe(map((response) => response.pictures));
}
