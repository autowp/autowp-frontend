import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIPicture} from '@services/picture';
import $ from 'jquery';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';

interface JcropCrop {
  h: number;
  w: number;
  x: number;
  y: number;
}

@Component({
  imports: [AsyncPipe],
  selector: 'app-upload-crop',
  standalone: true,
  templateUrl: './crop.component.html',
})
export class UploadCropComponent implements OnInit, OnDestroy {
  protected readonly activeModal = inject(NgbActiveModal);

  @Output() changed = new EventEmitter<void>();

  @Input() set picture(picture: APIPicture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<APIPicture | null>(null);

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

  ngOnInit(): void {
    this.sub = combineLatest([this.img$, this.picture$]).subscribe(([img, picture]) => {
      if (img && picture) {
        const $img = $(img);
        const $body = $img.parent();

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
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  protected selectAll(picture: APIPicture) {}

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
