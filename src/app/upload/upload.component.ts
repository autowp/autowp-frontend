import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
})
export class UploadComponent {}
