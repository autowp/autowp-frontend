import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPaginator} from '../../../services/api.service';
import {APIPicture, PictureService} from '../../../services/picture';
import {chunkBy} from '../../../chunk';

@Component({
  selector: 'app-catalogue-engines-pictures',
  templateUrl: './pictures.component.html'
})
@Injectable()
export class CatalogueEnginesPicturesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public pictures: APIPicture[][] = [];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private pictureService: PictureService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname: catname,
          fields: 'catname,name_text,name_html',
          limit: 1
        }).pipe(
          map(response => response && response.items.length ? response.items[0] : null),
          tap(brand => {
            this.brand = brand;
            if (brand) {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                pageId: 208,
                name: 'page/208/ng-name',
                args: {
                  brand: brand.name_text,
                }
              });
            }
          })
        );
      }),
      switchMap(brand =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand: brand,
            queryParams: queryParams
          }))
        )
      ),
      switchMap(data =>
        this.pictureService.getPictures({
          fields: [
            'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'
          ].join(','),
          limit: 20,
          page: +data.queryParams.get('page'),
          item_id: data.brand.id,
          status: 'accepted',
          order: 3
        })
      )
    ).subscribe(data => {
      this.pictures = chunkBy(data.pictures, 4);
      this.paginator = data.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
