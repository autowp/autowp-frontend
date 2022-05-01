import { OnInit, Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PageEnvService } from '../services/page-env.service';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {APIGalleryItem} from './definitions';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html'
})
export class GalleryPageComponent implements OnInit {
  public identity$ = this.route.paramMap.pipe(
    map(route => route.get('identity')),
    distinctUntilChanged()
  );

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false,
          isGalleryPage: true
        },
        nameTranslated: '', // data.picture.name_text,
        pageId: 187
      });
    }, 0);
  }

  pictureSelected(item: APIGalleryItem) {
    this.pageEnv.set({
      layout: {
        needRight: false,
        isGalleryPage: true
      },
      nameTranslated: item.name,
      pageId: 187
    });
  }
}
