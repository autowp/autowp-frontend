import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {getPerspectiveTranslation} from '@utils/translations';

import {APIPerspectiveService} from '../../../api/perspective/perspective.service';

@Component({
  selector: 'app-moder-pictures-perspective-picker',
  templateUrl: './perspective-picker.component.html',
})
export class ModerPicturesPerspectivePickerComponent {
  private readonly perspectiveService = inject(APIPerspectiveService);

  protected readonly perspectives$ = this.perspectiveService.getPerspectives$();

  @Input() perspectiveID?: number;
  @Output() perspectiveChanged = new EventEmitter<number>();

  protected change() {
    this.perspectiveChanged.emit(this.perspectiveID);
  }

  protected getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
