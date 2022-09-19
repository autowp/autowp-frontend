import { Component} from '@angular/core';
import { PageEnvService } from '../services/page-env.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html'
})
export class TelegramComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          pageId: 204
        }),
      0
    );
  }
}
