import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIPicture, PictureService} from '../services/picture';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {APIItem} from '../services/item';
import {Router} from '@angular/router';
import {APIPictureItem, PictureItemService} from '../services/picture-item';
import {CommentsSubscribeRequest, CommentsType, CommentsUnSubscribeRequest, PicturesViewRequest} from '@grpc/spec.pb';
import {CommentsClient, PicturesClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
})
export class PictureComponent {
  @Input() prefix: string[] = [];
  @Input() galleryRoute: string[];
  @Output() changed = new EventEmitter<boolean>();

  @Input() set picture(picture: APIPicture) {
    this.picture$.next(picture);

    this.picturesClient
      .view(
        new PicturesViewRequest({
          pictureId: '' + picture.id,
        })
      )
      .subscribe();
  }
  public picture$ = new BehaviorSubject<APIPicture>(null);

  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  public canEditSpecs$ = this.acl.isAllowed(Resource.SPECIFICATIONS, Privilege.EDIT);
  public showShareDialog = false;
  public location;
  public engines: APIItem[] = [];
  public statusLoading = false;

  public user$ = this.auth.getUser();

  constructor(
    private acl: ACLService,
    private auth: AuthService,
    private pictureService: PictureService,
    private router: Router,
    private pictureItemService: PictureItemService,
    private commentsGrpc: CommentsClient,
    private picturesClient: PicturesClient
  ) {
    this.location = location;
  }

  public savePerspective(perspectiveID: number | null, item: APIPictureItem) {
    this.pictureItemService.setPerspective(item.picture_id, item.item_id, item.type, perspectiveID).subscribe();
  }

  public pictureVoted() {
    this.changed.emit(true);
  }

  public toggleShareDialog(): false {
    this.showShareDialog = !this.showShareDialog;
    return false;
  }

  public setSubscribed(picture: APIPicture, value: boolean) {
    (value
      ? this.commentsGrpc.subscribe(
          new CommentsSubscribeRequest({
            itemId: '' + picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          })
        )
      : this.commentsGrpc.unSubscribe(
          new CommentsUnSubscribeRequest({
            itemId: '' + picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          })
        )
    ).subscribe(() => {
      picture.subscribed = value;
    });
  }

  public vote(picture: APIPicture, value: number) {
    this.pictureService.vote(picture.id, value).subscribe((votes) => {
      picture.votes = votes;
    });
    return false;
  }

  public openSource(picture: APIPicture) {
    window.open(picture.image.src);
  }

  public openGallery(picture: APIPicture, $event) {
    if ($event.ctrlKey) {
      this.openSource(picture);
      return;
    }
    this.router.navigate(this.galleryRoute ? this.galleryRoute : ['../../gallery', picture.identity]);
  }

  private setPictureStatus(picture: APIPicture, status: string) {
    this.statusLoading = true;
    this.pictureService.setPictureStatus(picture.id, status).subscribe({
      next: () => {
        this.changed.emit(true);
      },
      complete: () => {
        this.statusLoading = false;
      },
    });
  }

  public unacceptPicture(picture: APIPicture) {
    this.setPictureStatus(picture, 'inbox');
  }

  public acceptPicture(picture: APIPicture) {
    this.setPictureStatus(picture, 'accepted');
  }

  public deletePicture(picture: APIPicture) {
    this.setPictureStatus(picture, 'removing');
  }

  public restorePicture(picture: APIPicture) {
    this.setPictureStatus(picture, 'inbox');
  }
}
