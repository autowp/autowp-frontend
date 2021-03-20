import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html'
})
@Injectable()
export class TelegramComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Telegram`,
          pageId: 204
        }),
      0
    );
  }
}
