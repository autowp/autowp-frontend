import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { APIPicture, PictureService } from '../services/picture';
import { ACLService } from '../services/acl.service';
import { APIUser } from '../services/user';
import { Subscription} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { APICommentsService } from '../api/comments/comments.service';
import { APIItem } from '../services/item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit, OnDestroy {
  @Input() picture: APIPicture;
  @Input() prefix: string[] = [];

  public isModer = false;
  public canEditSpecs = false;
  public showShareDialog = false;
  public user: APIUser;
  private sub: Subscription;
  public location;
  public engines: APIItem[] = [];

  constructor(
    private acl: ACLService,
    private auth: AuthService,
    private commentsService: APICommentsService,
    private pictureService: PictureService,
    private router: Router
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

  public pictureVoted() {}

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
    this.router.navigate(['../../gallery', this.picture.identity]);
  }
}
