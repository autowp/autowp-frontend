import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { APIPicture, PictureService } from '../services/picture';
import { ACLService } from '../services/acl.service';
import { APIUser } from '../services/user';
import { Subscription} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { APICommentsService } from '../api/comments/comments.service';
import { APIItem } from '../services/item';
import {Router} from '@angular/router';
import {APIPictureItem, PictureItemService} from '../services/picture-item';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit, OnDestroy {
  @Input() picture: APIPicture;
  @Input() prefix: string[] = [];
  @Input() galleryRoute: string[];
  @Output() changed = new EventEmitter<boolean>();

  public isModer = false;
  public canEditSpecs = false;
  public showShareDialog = false;
  public user: APIUser;
  private sub: Subscription;
  public location;
  public engines: APIItem[] = [];
  public statusLoading = false;

  constructor(
    private acl: ACLService,
    private auth: AuthService,
    private commentsService: APICommentsService,
    private pictureService: PictureService,
    private router: Router,
    private pictureItemService: PictureItemService
  ) {}

  ngOnInit(): void {
    this.location = location;

    this.acl
      .inheritsRole('moder')
      .subscribe((isModer) => (this.isModer = isModer));

    this.acl
      .isAllowed('specifications', 'edit')
      .subscribe((canEditSpecs) => (this.canEditSpecs = canEditSpecs));

    this.sub = this.auth.getUser().pipe(tap((user) => (this.user = user))).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public savePerspective(perspectiveID: number|null, item: APIPictureItem) {
    this.pictureItemService.setPerspective(
      item.picture_id,
      item.item_id,
      item.type,
      perspectiveID
    )
      .subscribe();
  }

  public pictureVoted() {
    this.changed.emit(true);
  }

  public toggleShareDialog(): false {
    this.showShareDialog = !this.showShareDialog;
    return false;
  }

  public setSubscribed(value: boolean) {
    this.commentsService
      .setSubscribed(this.picture.id, 1, value)
      .subscribe(() => {
        this.picture.subscribed = value;
      });
  }

  public vote(value) {
    this.pictureService.vote(this.picture.id, value).subscribe((votes) => {
      this.picture.votes = votes;
    });
    return false;
  }

  public openSource($event) {
    window.open(this.picture.image.src);
  }

  public openGallery($event) {
    if ($event.ctrlKey) {
      this.openSource($event);
      return;
    }
    this.router.navigate(this.galleryRoute ? this.galleryRoute : ['../../gallery', this.picture.identity]);
  }

  private setPictureStatus(status: string) {
    this.statusLoading = true;
    this.pictureService.setPictureStatus(this.picture.id, status)
      .subscribe(
        () => {
          this.changed.emit(true);
        },
        () => {},
        () => {
          this.statusLoading = false;
        }
      );
  }

  public unacceptPicture() {
    this.setPictureStatus('inbox');
  }

  public acceptPicture() {
    this.setPictureStatus('accepted');
  }

  public deletePicture() {
    this.setPictureStatus('removing');
  }

  public restorePicture() {
    this.setPictureStatus('inbox');
  }
}
