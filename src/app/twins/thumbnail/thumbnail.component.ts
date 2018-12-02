import { Component, Injectable, Input, OnInit, OnDestroy } from '@angular/core';
import { APIPicture } from '../../services/picture';
import { ACLService } from '../../services/acl.service';
import { Subscription } from 'rxjs';
import { APIItem } from '../../services/item';

@Component({
  selector: 'app-twins-group-pictures-thumbnail',
  templateUrl: './thumbnail.component.html'
})
@Injectable()
export class TwinsGroupPicturesThumbnailComponent implements OnInit, OnDestroy {
  @Input() picture: APIPicture;
  @Input() group: APIItem;

  public isModer = false;
  private sub: Subscription;

  constructor(private acl: ACLService) {}

  ngOnInit(): void {
    this.sub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
