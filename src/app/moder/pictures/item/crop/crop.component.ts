import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SetPictureCropRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import * as $ from 'jquery';
import {BehaviorSubject, EMPTY, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

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
  selector: 'app-moder-pictures-item-crop',
  templateUrl: './crop.component.html',
})
export class ModerPicturesItemCropComponent implements OnInit, OnDestroy {
  private routeSub?: Subscription;
  protected aspect = '';
  protected resolution = '';
  private jcrop: Jcrop;
  private currentCrop: Crop = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
  };
  private minSize = [400, 300];
  protected picture?: APIPicture;
  protected readonly img$ = new BehaviorSubject<HTMLElement | null>(null);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly picturesClient: PicturesClient,
    private readonly toastService: ToastsService,
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 148,
        }),
      0,
    );
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => parseInt(params.get('id') || '', 10)),
        distinctUntilChanged(),
        debounceTime(10),
        switchMap((id) =>
          this.pictureService.getPicture$(id, {
            fields: 'crop,image',
          }),
        ),
        switchMap((picture) => this.img$.pipe(map((img) => ({img, picture})))),
      )
      .subscribe((data) => {
        this.picture = data.picture;

        if (data.img) {
          const $img = $(data.img);
          const $body = $img.parent();

          this.jcrop = null;
          if (this.picture.crop) {
            this.currentCrop = {
              h: this.picture.crop.height || 0,
              w: this.picture.crop.width || 0,
              x: this.picture.crop.left || 0,
              y: this.picture.crop.top || 0,
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
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  protected selectAll() {
    if (this.picture) {
      this.jcrop.setSelect([0, 0, this.picture.width, this.picture.height]);
    }
  }

  protected saveCrop() {
    if (this.picture) {
      this.picturesClient
        .setPictureCrop(
          new SetPictureCropRequest({
            cropHeight: Math.round(this.currentCrop.h),
            cropLeft: Math.round(this.currentCrop.x),
            cropTop: Math.round(this.currentCrop.y),
            cropWidth: Math.round(this.currentCrop.w),
            pictureId: '' + this.picture.id,
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

  private updateSelectionText() {
    const text = Math.round(this.currentCrop.w) + '×' + Math.round(this.currentCrop.h);
    const pw = 4;
    const ph = (pw * this.currentCrop.h) / this.currentCrop.w;
    const phRound = Math.round(ph * 10) / 10;

    this.aspect = pw + ':' + phRound;
    this.resolution = text;
  }

  protected onLoad(e: Event) {
    if (e.target instanceof HTMLElement) {
      this.img$.next(e.target);
    }
  }
}
