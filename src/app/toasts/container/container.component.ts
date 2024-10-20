import {Component, inject} from '@angular/core';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

import {ToastsService} from '../toasts.service';

@Component({
  imports: [NgbToast],
  selector: 'app-toasts',
  standalone: true,
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  readonly toastService = inject(ToastsService);

  protected typeToClass(type: string): null | string {
    switch (type) {
      case 'danger':
        return 'bg-danger text-light';
      case 'success':
        return 'bg-success text-light';
    }

    return null;
  }
}
