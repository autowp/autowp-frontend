import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {}
