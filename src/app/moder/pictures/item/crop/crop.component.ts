import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SetPictureCropRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
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
  imports: [RouterLink],
  selector: 'app-moder-pictures-item-crop',
  templateUrl: './crop.component.html',
})
export class ModerPicturesItemCropComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

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
  protected readonly img$ = new BehaviorSubject<HTMLImageElement | null>(null);

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
        map((params) => parseInt(params.get('id') ?? '', 10)),
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
          const body = data.img.parentElement;
          if (!body) {
            return;
          }

          this.jcrop = null;
          if (this.picture.crop) {
            this.currentCrop = {
              h: this.picture.crop.height ?? 0,
              w: this.picture.crop.width ?? 0,
              x: this.picture.crop.left ?? 0,
              y: this.picture.crop.top ?? 0,
            };
          } else {
            this.currentCrop = {
              h: this.picture.height,
              w: this.picture.width,
              x: 0,
              y: 0,
            };
          }

          const styles = window.getComputedStyle(body, null);
          const bWidth = body.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight) || 1;

          const scale = this.picture.width / bWidth;
          const width = this.picture.width / scale;
          const height = this.picture.height / scale;

          data.img.style.width = width + 'px';
          data.img.style.height = height + 'px';

          this.jcrop = Jcrop(data.img, {
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
    if (e.target instanceof HTMLImageElement) {
      this.img$.next(e.target);
    }
  }
}
