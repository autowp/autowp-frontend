import {Component} from '@angular/core';
import {PictureService} from '@services/picture';
import {map, delay} from 'rxjs/operators';

@Component({
  selector: 'app-index-pictures',
  templateUrl: './pictures.component.html',
})
export class IndexPicturesComponent {
  protected readonly items$ = this.pictureService
    .getPictures$({
      limit: 4,
      order: 15,
      status: 'accepted',
      accepted_in_days: 3,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
    })
    .pipe(
      delay(5000),
      map((response) => response.pictures)
    );

  constructor(private readonly pictureService: PictureService) {}
}
