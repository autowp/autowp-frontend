import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {APIImage, Picture} from '@grpc/spec.pb';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';

// @ts-expect-error Legacy
import Jcrop from '../../jcrop/jquery.Jcrop';

interface JcropCrop {
  h: number;
  w: number;
  x: number;
  y: number;
}

@Component({
  imports: [AsyncPipe],
  selector: 'app-upload-crop',
  templateUrl: './crop.component.html',
})
export class UploadCropComponent implements OnDestroy, OnInit {
  protected readonly activeModal = inject(NgbActiveModal);

  @Output() changed = new EventEmitter<void>();

  @Input() set picture(picture: Picture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<null | Picture>(null);

  readonly #minSize = [400, 300];

  #jcrop: Jcrop = null;
  protected aspect = '';
  protected resolution = '';
  protected readonly img$ = new BehaviorSubject<HTMLImageElement | null>(null);
  private currentCrop: JcropCrop = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
  };
  #sub?: Subscription;

  ngOnInit(): void {
    this.#sub = combineLatest([this.img$, this.picture$]).subscribe(([img, picture]) => {
      if (img && picture) {
        const body = img.parentElement;

        if (!body) {
          return;
        }

        this.#jcrop = null;
        if (picture.image && picture.image.cropWidth && picture.image.cropHeight) {
          this.currentCrop = {
            h: picture.image.cropHeight ?? 0,
            w: picture.image.cropWidth ?? 0,
            x: picture.image.cropLeft ?? 0,
            y: picture.image.cropTop ?? 0,
          };
        } else {
          this.currentCrop = {
            h: picture.height,
            w: picture.width,
            x: 0,
            y: 0,
          };
        }

        const styles = window.getComputedStyle(body, null);
        const bWidth = body.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight) || 1;

        const scale = picture.width / bWidth;
        const width = picture.width / scale;
        const height = picture.height / scale;

        img.style.width = width + 'px';
        img.style.height = height + 'px';

        this.#jcrop = Jcrop(img, {
          boxHeight: height,
          boxWidth: width,
          keySupport: false,
          minSize: this.#minSize,
          onSelect: (c: JcropCrop) => {
            this.currentCrop = c;
            if (this.currentCrop.y < 0) {
              this.currentCrop.y = 0;
            }
            if (this.currentCrop.x < 0) {
              this.currentCrop.x = 0;
            }
            this.updateSelectionText();
          },
          setSelect: [
            this.currentCrop.x,
            this.currentCrop.y,
            this.currentCrop.x + this.currentCrop.w,
            this.currentCrop.y + this.currentCrop.h,
          ],
          trueSize: [picture.width, picture.height],
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.#sub) {
      this.#sub.unsubscribe();
    }
  }

  protected selectAll(picture: Picture) {
    if (this.#jcrop) {
      this.#jcrop.setSelect([0, 0, picture.width, picture.height]);
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
    if (e.target && e.target instanceof HTMLImageElement) {
      this.img$.next(e.target);
    }
  }

  protected onSave(picture: Picture) {
    if (!picture.image) {
      picture.image = new APIImage();
    }
    picture.image.cropLeft = this.currentCrop.x;
    picture.image.cropTop = this.currentCrop.y;
    picture.image.cropWidth = this.currentCrop.w;
    picture.image.cropHeight = this.currentCrop.h;

    this.changed.emit();
    this.activeModal.close();
  }
}
