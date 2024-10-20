import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SetPictureItemAreaRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {PictureItemService} from '@services/picture-item';
import $ from 'jquery';
import {BehaviorSubject, EMPTY, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

// @ts-expect-error Legacy
import Jcrop from '../../../../jcrop/jquery.Jcrop.js';
import {ToastsService} from '../../../../toasts/toasts.service';

interface Crop {
  h: number;
  w: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-moder-pictures-item-area',
  templateUrl: './area.component.html',
})
export class ModerPicturesItemAreaComponent implements OnInit, OnDestroy {
  private readonly pictureItemService = inject(PictureItemService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

  private id: number = 0;
  private itemID: number = 0;
  private type: number = 0;
  private sub?: Subscription;
  protected aspect = '';
  protected resolution = '';
  private jcrop: Jcrop;
  private currentCrop: Crop = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
  };
  private minSize = [50, 50];
  protected picture: APIPicture | null = null;
  protected readonly img$ = new BehaviorSubject<HTMLElement | null>(null);

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 148,
        }),
      0,
    );

    this.sub = this.route.paramMap
      .pipe(
        map((params) => parseInt(params.get('id') || '', 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap((id) =>
          this.pictureService.getPicture$(id, {
            fields: 'crop,image',
          }),
        ),
        tap((picture) => {
          this.id = picture.id;
          this.picture = picture;
        }),
        switchMap((picture) =>
          this.route.queryParamMap.pipe(
            map((params) => ({
              item_id: parseInt(params.get('item_id') || '', 10),
              type: parseInt(params.get('type') || '', 10),
            })),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            debounceTime(30),
            map((params) => ({params, picture})),
          ),
        ),
        tap((data) => {
          this.itemID = data.params.item_id;
          this.type = data.params.type;
        }),
        switchMap((data) =>
          this.pictureItemService.get$(data.picture.id, data.params.item_id, data.params.type, {
            fields: 'area',
          }),
        ),
        switchMap((data) => this.img$.pipe(map((img) => ({img, pictureItem: data})))),
      )
      .subscribe({
        error: () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
        },
        next: (data) => {
          const area = data.pictureItem.area;

          if (data.img && this.picture) {
            const $img = $(data.img);
            const $body = $img.parent();

            this.jcrop = null;
            if (area) {
              this.currentCrop = {
                h: area.height,
                w: area.width,
                x: area.left,
                y: area.top,
              };
            } else {
              this.currentCrop = {
                h: this.picture.height,
                w: this.picture.width,
                x: 0,
                y: 0,
              };
            }

            const bWidth = $body.width() || 1;

            const scale = this.picture.width / bWidth;
            const width = this.picture.width / scale;
            const height = this.picture.height / scale;

            $img.css({
              height,
              width,
            });

            this.jcrop = Jcrop($img[0], {
              boxHeight: height,
              boxWidth: width,
              keySupport: false,
              minSize: this.minSize,
              onSelect: (c: Crop) => {
                this.currentCrop = c;
                this.updateSelectionText();
              },
              setSelect: [
                this.currentCrop.x,
                this.currentCrop.y,
                this.currentCrop.x + this.currentCrop.w,
                this.currentCrop.y + this.currentCrop.h,
              ],
              trueSize: [this.picture.width, this.picture.height],
            });
          }
        },
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  protected selectAll() {
    if (this.picture) {
      this.jcrop.setSelect([0, 0, this.picture.width, this.picture.height]);
    }
  }

  private updateSelectionText() {
    const text = Math.round(this.currentCrop.w) + '×' + Math.round(this.currentCrop.h);
    const pw = 4;
    const ph = (pw * this.currentCrop.h) / this.currentCrop.w;
    const phRound = Math.round(ph * 10) / 10;

    this.aspect = pw + ':' + phRound;
    this.resolution = text;
  }

  protected saveCrop() {
    if (this.picture) {
      this.picturesClient
        .setPictureItemArea(
          new SetPictureItemAreaRequest({
            cropHeight: Math.round(this.currentCrop.h),
            cropLeft: Math.round(this.currentCrop.x),
            cropTop: Math.round(this.currentCrop.y),
            cropWidth: Math.round(this.currentCrop.w),
            itemId: '' + this.itemID,
            pictureId: '' + this.id,
            type: this.type,
          }),
        )
        .pipe(
          catchError((error: unknown) => {
            this.toastService.handleError(error);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          if (this.picture) {
            this.router.navigate(['/moder/pictures', this.picture.id]);
          }
        });
    }
  }

  protected onLoad(e: Event) {
    if (e.target && e.target instanceof HTMLElement) {
      this.img$.next(e.target);
    }
  }
}
