import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIItem, ItemService } from '../services/item';
import { ACLService } from '../services/acl.service';
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
@Injectable()
export class MuseumComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public museumModer = false;
  public links: APIItemLink[] = [];
  public pictures: APIPicture[] = [];
  public item: APIItem;

  public markers: Marker[] = [];
  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      })
    ],
    zoom: 4,
    center: latLng(50, 20)
  };
  private aclSub: Subscription;

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
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.museumModer = isModer));

    this.routeSub = this.route.params
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params =>
          this.itemService.getItem(params.id, {
            fields: ['name_text', 'lat', 'lng', 'description'].join(',')
          })
        ),
        catchError((err, caught) => {
          this.toastService.response(err);
          this.router.navigate(['/error-404']);
          return EMPTY;
        }),
        tap(item => {
          if (item.item_type_id !== 7) {
            this.router.navigate(['/error-404']);
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
          this.itemLinkService
            .getItems({
              item_id: item.id
            })
            .pipe(
              catchError((err, caught) => {
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
              catchError((err, caught) => {
                this.toastService.response(err);
                return of(null);
              })
            )
        ]).pipe(
          map(responses => ({
            item: item,
            links: responses[0],
            pictures: responses[1]
          }))
        ))
      )
      .subscribe(data => {
        this.item = data.item;
        this.pictures = data.pictures.pictures;
        this.links = data.links.items;

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
    this.aclSub.unsubscribe();
  }
}
