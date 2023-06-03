import {OnInit, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {APIGalleryItem} from './definitions';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {
  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged()
  );

  constructor(private readonly route: ActivatedRoute, private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: '', // data.picture.name_text,
        pageId: 187,
      });
    }, 0);
  }

  protected pictureSelected(item: APIGalleryItem) {
    this.pageEnv.set({
      layout: {isGalleryPage: true},
      title: item.name,
      pageId: 187,
    });
  }
}
