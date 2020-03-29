import {Component, Injectable, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {APIPerspectiveService} from '../../../api/perspective/perspective.service';
import {Subscription} from 'rxjs';
import {APIPerspective} from '../../../services/api.service';

@Component({
  selector: 'app-moder-pictures-perspective-picker',
  templateUrl: './perspective-picker.component.html'
})
@Injectable()
export class ModerPicturesPerspectivePickerComponent implements OnInit, OnDestroy {
  private perspectiveSub: Subscription;
  public perspectives: APIPerspective[];

  @Input() perspectiveID: number;
  @Output() perspectiveChanged = new EventEmitter<number>();

  constructor(
    private perspectiveService: APIPerspectiveService
  ) { }

  ngOnInit(): void {
    this.perspectiveSub = this.perspectiveService
      .getPerspectives()
      .subscribe(perspectives => (this.perspectives = perspectives));
  }

  ngOnDestroy(): void {
    this.perspectiveSub.unsubscribe();
  }

  public change() {
    this.perspectiveChanged.emit(this.perspectiveID);
  }
}
