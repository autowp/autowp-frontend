import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-mosts',
  templateUrl: './mosts.component.html',
})
export class MostsComponent implements OnInit {
  protected readonly ratingCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('rating_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );
  protected readonly typeCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('type_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );
  protected readonly yearsCatname$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('years_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  constructor(private readonly route: ActivatedRoute, private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 21});
    }, 0);
  }
}
