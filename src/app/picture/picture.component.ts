import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {APIPicture, PictureService} from '../services/picture';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {APIItem} from '../services/item';
import {Router} from '@angular/router';
import {APIPictureItem, PictureItemService} from '../services/picture-item';
import {APIUser, CommentsSubscribeRequest, CommentsType, CommentsUnSubscribeRequest, PicturesViewRequest} from '../../../generated/spec.pb';
import {CommentsClient, PicturesClient} from '../../../generated/spec.pbsc';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit, OnDestroy, OnChanges {
  @Input() picture: APIPicture;
  @Input() prefix: string[] = [];
  @Input() galleryRoute: string[];
  @Output() changed = new EventEmitter<boolean>();

  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public canEditSpecs$ = this.acl.isAllowed(Resource.SPECIFICATIONS, Privilege.EDIT);
  public showShareDialog = false;
  public user: APIUser;
  private sub: Subscription;
  public location;
  public engines: APIItem[] = [];
  public statusLoading = false;

  constructor(
    private acl: ACLService,
    private auth: AuthService,
    private pictureService: PictureService,
    private router: Router,
    private pictureItemService: PictureItemService,
    private commentsGrpc: CommentsClient,
    private picturesClient: PicturesClient,
  ) {}

  ngOnInit(): void {
    this.location = location;

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
    (value
      ? this.commentsGrpc.subscribe(new CommentsSubscribeRequest({
        itemId: ''+this.picture.id,
        typeId: CommentsType.PICTURES_TYPE_ID,
      }))
      : this.commentsGrpc.unSubscribe(new CommentsUnSubscribeRequest({
        itemId: ''+this.picture.id,
        typeId: CommentsType.PICTURES_TYPE_ID,
      }))
    ).subscribe(() => {
      this.picture.subscribed = value;
    });
  }

  public vote(value) {
    this.pictureService.vote(this.picture.id, value).subscribe((votes) => {
      this.picture.votes = votes;
    });
    return false;
  }

  public openSource() {
    window.open(this.picture.image.src);
  }

  public openGallery($event) {
    if ($event.ctrlKey) {
      this.openSource();
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picture && this.picture) {
      this.picturesClient.view(new PicturesViewRequest({
        pictureId: ''+this.picture.id
      })).subscribe();
    }
  }
}
