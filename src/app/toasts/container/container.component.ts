import {Component} from '@angular/core';

import {ToastsService} from '../toasts.service';

@Component({
  selector: 'app-toasts',
  styleUrls: ['./container.component.scss'],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  constructor(public readonly toastService: ToastsService) {}

  protected typeToClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success text-light';
      case 'danger':
        return 'bg-danger text-light';
    }

    return null;
  }
}
