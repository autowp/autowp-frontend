import {Component} from '@angular/core';
import {ToastsService} from '../toasts.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './container.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})

export class ContainerComponent {
  constructor(public toastService: ToastsService) {}

  public typeToClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success text-light';
      case 'danger':
        return 'bg-danger';
    }

    return null;
  }
}
