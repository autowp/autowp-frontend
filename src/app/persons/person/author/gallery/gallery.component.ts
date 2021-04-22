import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of, Subscription} from 'rxjs';
import {APIPaginator} from '../../../../services/api.service';
import {APIItem, ItemService} from '../../../../services/item';
import {PageEnvService} from '../../../../services/page-env.service';
import {ToastsService} from '../../../../toasts/toasts.service';
import {APIGalleryItem} from '../../../../gallery/definitions';

@Component({
  selector: 'app-persons-person-author-gallery',
  templateUrl: './gallery.component.html'
})
export class PersonsPersonAuthorGalleryComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public paginator: APIPaginator;
  public picturesRouterLink: string[];
  public galleryRouterLink: string[];
  public item: APIItem;
  public current: string;

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private toastService: ToastsService
  ) {
  }

  ngOnInit(): void {

    this.sub = this.getPerson().pipe(
      map(item => {
        const routerLink = ['/persons', item.id.toString()];

        // this.routerLink = routerLink;
        this.picturesRouterLink = routerLink.concat(['author']);
        this.galleryRouterLink = routerLink.concat(['author', 'gallery']);

        return item;
      }),
      switchMap(item => this.getIdentity().pipe(
        map(identity => {
          return {
            item,
            identity
          };
        })
      )),
      map(data => {
        if (!data.identity) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.item = data.item;
        this.current = data.identity;

        return data;
      })
    ).subscribe();
  }

  getPerson(): Observable<APIItem> {
    return this.route.paramMap.pipe(
      map(params => parseInt(params.get('id'), 10)),
      distinctUntilChanged(),
      debounceTime(30),
      switchMap(id =>
        this.itemService.getItem(id, {
          fields: ['name_text', 'name_html', 'description'].join(',')
        })
      ),
      catchError(err => {
        this.toastService.response(err);
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }),
      switchMap(item => {
        if (item.item_type_id !== 8) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        return of(item);
      })
    );
  }

  private getIdentity() {
    return this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false,
          isGalleryPage: true
        },
        nameTranslated: item.name,
        pageId: 34
      });
    }, 0);
  }
}
