import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, map} from 'rxjs/operators';

import {APIGalleryItem} from './definitions';
import {GalleryComponent} from './gallery.component';

@Component({
  imports: [GalleryComponent, AsyncPipe],
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);

  protected readonly identity$ = this.#route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.#pageEnv.set({
        layout: {isGalleryPage: true},
        pageId: 187,
        title: '', // data.picture.name_text,
      });
    }, 0);
  }

  protected pictureSelected(item: APIGalleryItem | null) {
    if (item) {
      this.#pageEnv.set({
        layout: {isGalleryPage: true},
        pageId: 187,
        title: item.name,
      });
    }
  }
}
