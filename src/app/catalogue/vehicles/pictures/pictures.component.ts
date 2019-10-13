import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {APIPaginator} from '../../../services/api.service';
import {APIPicture, PictureService} from '../../../services/picture';
import {chunkBy} from '../../../chunk';
import {CatalogueService} from '../../catalogue-service';
import {ACLService} from '../../../services/acl.service';
import {APIItemParent} from '../../../services/item-parent';

@Component({
  selector: 'app-catalogue-vehicles-pictures',
  templateUrl: './pictures.component.html'
})
@Injectable()
export class CatalogueVehiclesPicturesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public pictures: APIPicture[][] = [];
  public paginator: APIPaginator;
  public isModer: boolean;
  public path: APIItemParent[] = [];

  constructor(
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService
  ) {
  }

  ngOnInit(): void {

    this.sub = this.acl.inheritsRole('moder').pipe(
      tap(isModer => (this.isModer = isModer)),
      switchMap(isModer => this.catalogueService.resolveCatalogue(this.route, isModer)),
      tap(data => {
        this.brand = data.brand;
        if (data.brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            pageId: 34,
            name: data.brand.name_text,
            args: {
              item: data.brand.name_text,
            }
          });
        }
        this.path = data.path;
      }),
      switchMap(data =>
        this.getPage().pipe(
          switchMap(page => this.pictureService.getPictures({
            fields: [
              'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'
            ].join(','),
            limit: 20,
            page: page,
            item_id: data.brand.id,
            status: 'accepted',
            order: 3
          }))
        )
      )
    ).subscribe(data => {
      this.pictures = chunkBy(data.pictures, 4);
      this.paginator = data.paginator;
    });
  }

  private getPage() {
    return this.route.queryParamMap.pipe(
      map(params => +params.get('page')),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
