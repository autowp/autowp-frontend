import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIItem, ItemService } from '../services/item';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {Subscription, combineLatest, of, EMPTY} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService, APIPicture } from '../services/picture';
import { ItemLinkService, APIItemLink } from '../services/item-link';
import { PageEnvService } from '../services/page-env.service';
import { Marker, tileLayer, latLng, marker, icon } from 'leaflet';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  tap, map
} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html'
})
export class MuseumComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public museumModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public links: APIItemLink[] = [];
  public pictures: APIPicture[] = [];
  public item: APIItem;

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
    private acl: ACLService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService,
    private itemLinkService: ItemLinkService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          this.itemService.getItem(id, {
            fields: ['name_text', 'lat', 'lng', 'description'].join(',')
          })
        ),
        catchError(err => {
          this.toastService.response(err);
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }),
        tap(item => {
          if (item.item_type_id !== 7) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return;
          }

          this.pageEnv.set({
            layout: {
              needRight: true
            },
            nameTranslated: item.name_text,
            pageId: 159
          });
        }),
        switchMap(item => combineLatest([
          of(item),
          this.itemLinkService
            .getItems({
              item_id: item.id
            })
            .pipe(
              catchError(err => {
                this.toastService.response(err);
                return of(null);
              })
            ),
          this.pictureService
            .getPictures({
              status: 'accepted',
              exact_item_id: item.id,
              fields:
                'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
              limit: 20,
              order: 12
            })
            .pipe(
              catchError(err => {
                this.toastService.response(err);
                return of(null);
              })
            )
        ]))
      )
      .subscribe(([item, links, pictures]) => {
        this.item = item;
        this.pictures = pictures.pictures;
        this.links = links.items;

        if (this.item.lat && this.item.lng) {
          this.options.center = latLng([this.item.lat, this.item.lng]);
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
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
