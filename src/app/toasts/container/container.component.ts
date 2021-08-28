import {Component} from '@angular/core';
import {ToastsService} from '../toasts.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent {
  constructor(public toastService: ToastsService) {}

  public typeToClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-success text-light';
      case 'danger':
        return 'bg-danger text-light';
    }

    return null;
  }
}
