import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIPicture} from '@services/picture';
import $ from 'jquery';
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
  selector: 'app-upload-crop',
  templateUrl: './crop.component.html',
})
export class UploadCropComponent implements OnInit, OnDestroy {
  @Output() changed = new EventEmitter<void>();

  @Input() set picture(picture: APIPicture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<APIPicture | null>(null);

  private readonly minSize = [400, 300];

  private jcrop: Jcrop = null;
  protected aspect: string = '';
  protected resolution: string = '';
  protected readonly img$ = new BehaviorSubject<HTMLElement | null>(null);
  private currentCrop: JcropCrop = {
    h: 0,
    w: 0,
    x: 0,
    y: 0,
  };
  private sub?: Subscription;

  constructor(protected readonly activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.sub = combineLatest([this.img$, this.picture$]).subscribe(([img, picture]) => {
      if (img && picture) {
        const $img = $(img);
        const $body = $img.parent();

        this.jcrop = null;
        if (picture.crop) {
          this.currentCrop = {
            h: picture.crop.height || 0,
            w: picture.crop.width || 0,
            x: picture.crop.left || 0,
            y: picture.crop.top || 0,
          };
        } else {
          this.currentCrop = {
            h: picture.height,
            w: picture.width,
            x: 0,
            y: 0,
          };
        }

        const bWidth = $body.width() || 1;

        const scale = picture.width / bWidth;
        const width = picture.width / scale;
        const height = picture.height / scale;

        $img.css({
          height,
          width,
        });

        this.jcrop = Jcrop($img[0], {
          boxHeight: height,
          boxWidth: width,
          keySupport: false,
          minSize: this.minSize,
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
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  protected selectAll(picture: APIPicture) {
    if (this.jcrop) {
      this.jcrop.setSelect([0, 0, picture.width, picture.height]);
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
    if (e.target && e.target instanceof HTMLElement) {
      this.img$.next(e.target);
    }
  }

  protected onSave(picture: APIPicture) {
    if (!picture.crop) {
      picture.crop = {
        height: 0,
        left: 0,
        top: 0,
        width: 0,
      };
    }
    picture.crop.left = this.currentCrop.x;
    picture.crop.top = this.currentCrop.y;
    picture.crop.width = this.currentCrop.w;
    picture.crop.height = this.currentCrop.h;

    this.changed.emit();
    this.activeModal.close();
  }
}
