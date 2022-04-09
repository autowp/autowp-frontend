import {Component, Input, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { APIPicture } from '../../services/picture';
import * as $ from 'jquery';
import Jcrop from '../../jcrop/jquery.Jcrop';

interface JcropCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

@Component({
  selector: 'app-upload-crop',
  templateUrl: './crop.component.html'
})
export class UploadCropComponent implements OnInit, OnDestroy {

  @Output() changed = new EventEmitter();

  @Input() set picture(picture: APIPicture) { this.picture$.next(picture); };
  public picture$ = new BehaviorSubject<APIPicture>(null);

  private minSize = [400, 300];

  private jcrop = null;
  public aspect: string;
  public resolution: string;
  public img$ = new BehaviorSubject<HTMLElement>(null);
  private currentCrop: JcropCrop = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  private sub: Subscription;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.picture$.next(this.picture);
    this.sub = combineLatest([this.img$, this.picture$]).subscribe(([img, picture]) => {
      if (img && picture) {

        const $img = $(img);
        const $body = $img.parent();

        this.jcrop = null;
        if (picture.crop) {
          this.currentCrop = {
            w: picture.crop.width,
            h: picture.crop.height,
            x: picture.crop.left,
            y: picture.crop.top
          };
        } else {
          this.currentCrop = {
            w: picture.width,
            h: picture.height,
            x: 0,
            y: 0
          };
        }

        const bWidth = $body.width() || 1;

        const scale = picture.width / bWidth;
        const width = picture.width / scale;
        const height = picture.height / scale;


        $img.css({
          width,
          height
        });

        this.jcrop = Jcrop($img[0], {
          onSelect: (c: JcropCrop) => {
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
          trueSize: [picture.width, picture.height],
          keySupport: false
        });
      }
    });
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

  public onLoad(e) {
    this.img$.next(e.target);
  }

  public onSave() {
    if (!this.picture.crop) {
      this.picture.crop = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
    }
    this.picture.crop.left = this.currentCrop.x;
    this.picture.crop.top = this.currentCrop.y;
    this.picture.crop.width = this.currentCrop.w;
    this.picture.crop.height = this.currentCrop.h;

    this.changed.emit();
    this.activeModal.close();
  }
}
