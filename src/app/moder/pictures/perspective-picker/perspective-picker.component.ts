import {Component, Input, Output, EventEmitter} from '@angular/core';
import {APIPerspectiveService} from '../../../api/perspective/perspective.service';
import {getPerspectiveTranslation} from '../../../utils/translations';

@Component({
  selector: 'app-moder-pictures-perspective-picker',
  templateUrl: './perspective-picker.component.html',
})
export class ModerPicturesPerspectivePickerComponent {
  public perspectives$ = this.perspectiveService.getPerspectives();

  @Input() perspectiveID: number;
  @Output() perspectiveChanged = new EventEmitter<number>();

  constructor(private perspectiveService: APIPerspectiveService) {}

  public change() {
    this.perspectiveChanged.emit(this.perspectiveID);
  }

  public getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
