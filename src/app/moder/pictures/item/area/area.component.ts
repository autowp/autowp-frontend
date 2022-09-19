import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import Jcrop from '../../../../jcrop/jquery.Jcrop.js';
import { PictureItemService } from '../../../../services/picture-item';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PictureService, APIPicture } from '../../../../services/picture';
import { PageEnvService } from '../../../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  map
} from 'rxjs/operators';

interface Crop {
  w: number;
  h: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-moder-pictures-item-area',
  templateUrl: './area.component.html'
})
export class ModerPicturesItemAreaComponent implements OnInit, OnDestroy {
  private id: number;
  private itemID: number;
  private type: number;
  private sub: Subscription;
  public aspect = '';
  public resolution = '';
  private jcrop: any;
  private currentCrop: Crop = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  private minSize = [50, 50];
  public picture: APIPicture;
  public img$ = new BehaviorSubject<HTMLElement>(null);

  constructor(
    private pictureItemService: PictureItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          pageId: 148
        }),
      0
    );

    this.sub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          this.pictureService.getPicture(id, {
            fields: 'crop,image'
          })
        ),
        tap(picture => {
          this.id = picture.id;
          this.picture = picture;
        }),
        switchMap(picture => this.route.queryParamMap.pipe(
          map(params => ({
            item_id: parseInt(params.get('item_id'), 10),
            type: parseInt(params.get('type'), 10),
          })),
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
          debounceTime(30),
          map(params => ({ picture, params }))
        )),
        tap(data => {
          this.itemID = data.params.item_id;
          this.type = data.params.type;
        }),
        switchMap(data =>
          this.pictureItemService.get(
            data.picture.id,
            data.params.item_id,
            data.params.type,
            {
              fields: 'area'
            }
          )
        ),
        switchMap(data => this.img$.pipe(
          map(img => ({ pictureItem: data, img }))
        ))
      )
      .subscribe(
        data => {
          const area = data.pictureItem.area;

          if (data.img) {
            const $img = $(data.img);
            const $body = $img.parent();

            this.jcrop = null;
            if (area) {
              this.currentCrop = {
                w: area.width,
                h: area.height,
                x: area.left,
                y: area.top
              };
            } else {
              this.currentCrop = {
                w: this.picture.width,
                h: this.picture.height,
                x: 0,
                y: 0
              };
            }

            const bWidth = $body.width() || 1;

            const scale = this.picture.width / bWidth;
            const width = this.picture.width / scale;
            const height = this.picture.height / scale;

            $img.css({
              width,
              height
            });

            this.jcrop = Jcrop($img[0], {
              onSelect: (c: Crop) => {
                this.currentCrop = c;
                this.updateSelectionText();
              },
              setSelect: [
                this.currentCrop.x,
                this.currentCrop.y,
                this.currentCrop.x + this.currentCrop.w,
                this.currentCrop.y + this.currentCrop.h
              ],
              minSize: this.minSize,
              boxWidth: width,
              boxHeight: height,
              trueSize: [this.picture.width, this.picture.height],
              keySupport: false
            });
          }
        },
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public selectAll() {
    this.jcrop.setSelect([0, 0, this.picture.width, this.picture.height]);
  }

  private updateSelectionText() {
    const text =
      Math.round(this.currentCrop.w) + '×' + Math.round(this.currentCrop.h);
    const pw = 4;
    const ph = (pw * this.currentCrop.h) / this.currentCrop.w;
    const phRound = Math.round(ph * 10) / 10;

    this.aspect = pw + ':' + phRound;
    this.resolution = text;
  }

  public saveCrop() {
    const area = {
      left: Math.round(this.currentCrop.x),
      top: Math.round(this.currentCrop.y),
      width: Math.round(this.currentCrop.w),
      height: Math.round(this.currentCrop.h)
    };

    this.pictureItemService
      .setArea(this.id, this.itemID, this.type, area)
      .subscribe(
        () => {
          this.router.navigate(['/moder/pictures', this.picture.id]);
        }
      );
  }

  public onLoad(e) {
    this.img$.next(e.target);
  }
}
