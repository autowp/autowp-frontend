import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {APIPaginator} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {APIGalleryItem} from '../../../../gallery/definitions';

@Component({
  selector: 'app-persons-person-author-gallery',
  templateUrl: './gallery.component.html',
})
export class PersonsPersonAuthorGalleryComponent {
  public paginator: APIPaginator;
  public picturesRouterLink: string[];

  public identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    switchMap((identity) => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(identity);
    }),
    shareReplay(1)
  );

  public itemID$ = this.route.parent.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged()
  );

  constructor(private pageEnv: PageEnvService, private route: ActivatedRoute, private router: Router) {}

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: 34,
      });
    }, 0);
  }
}
