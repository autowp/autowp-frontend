import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {MostsContentsComponent} from './contents/contents.component';

@Component({
  imports: [RouterLink, MostsContentsComponent, AsyncPipe],
  selector: 'app-mosts',
  standalone: true,
  templateUrl: './mosts.component.html',
})
export class MostsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);

  protected readonly ratingCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('rating_catname') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );
  protected readonly typeCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('type_catname') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );
  protected readonly yearsCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('years_catname') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 21});
    }, 0);
  }
}
