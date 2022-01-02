import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  APIItem,
  ItemService,
  APIItemRelatedGroupItem
} from '../services/item';
import {Subscription, EMPTY, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService, APIPicture } from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  map
} from 'rxjs/operators';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import { tileLayer, latLng, Marker, marker, icon } from 'leaflet';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html'
})
export class FactoryComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public factory: APIItem;
  public pictures: APIPicture[] = [];
  public relatedPictures: APIItemRelatedGroupItem[] = [];
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  public markers: Marker[] = [];
  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 4,
    center: latLng(50, 20)
  };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          this.itemService.getItem(parseInt(id, 10), {
            fields: [
              'name_text',
              'name_html',
              'lat',
              'lng',
              'description',
              'related_group_pictures'
            ].join(',')
          })
        ),
        catchError((err) => {
          this.toastService.response(err);
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }),
        switchMap(factory => {
          if (factory.item_type_id !== 6) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }

          return of(factory);
        }),
        switchMap(factory => this.pictureService.getPictures({
          status: 'accepted',
          exact_item_id: factory.id,
          limit: 24,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text'
        }).pipe(
          map(pictures => ({ factory, pictures }))
        )),
        catchError(err => {
          this.toastService.response(err);
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.factory = data.factory;
        this.pictures = data.pictures.pictures;

        this.relatedPictures = this.factory.related_group_pictures;

        if (this.factory.lat && this.factory.lng) {
          this.options.center = latLng([this.factory.lat, this.factory.lng]);
          this.options.zoom = 17;
          this.markers.push(
            marker(this.options.center, {
              icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: 'assets/marker-shadow.png'
              })
            })
          );
        }
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: this.factory.name_text,
          pageId: 181
        });
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
