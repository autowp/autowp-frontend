import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {}
