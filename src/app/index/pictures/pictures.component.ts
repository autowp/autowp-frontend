import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIPicture, PictureService} from '../../services/picture';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-index-pictures',
  templateUrl: './pictures.component.html'
})
@Injectable()
export class IndexPicturesComponent implements OnInit, OnDestroy {
  public items: APIPicture[];
  private sub: Subscription;

  constructor(private pictureService: PictureService) {}

  ngOnInit(): void {
    this.sub = this.pictureService.getPictures({
      limit: 6,
      order: 15,
      status: 'accepted',
      accepted_in_days: 3,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text'
    }).subscribe(response => {
      this.items = response.pictures;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

