import { Component, Injectable, Input, OnInit, OnDestroy } from '@angular/core';
import { ACLService } from '../../services/acl.service';
import { APIItem } from '../../services/item';
import { APIPicture } from '../../services/picture';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class NewListItemComponent implements OnInit, OnDestroy {
  public isModer = false;
  @Input() item: APIItem;
  @Input() pictures: APIPicture[];
  @Input() totalPictures: number;
  @Input() date: string;
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
