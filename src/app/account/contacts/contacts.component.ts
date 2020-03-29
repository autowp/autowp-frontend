import { Component, Injectable } from '@angular/core';
import { chunkBy } from '../../chunk';
import { ContactsService } from '../../services/contacts';
import { APIUser } from '../../services/user';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-account-contacts',
  templateUrl: './contacts.component.html'
})
@Injectable()
export class AccountContactsComponent {
  public items: APIUser[] = [];
  public chunks: APIUser[][];

  constructor(
    private api: APIService,
    private contactsService: ContactsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/198/name',
          pageId: 198
        }),
      0
    );

    this.contactsService
      .getContacts({
        fields: 'avatar,gravatar,last_online'
      })
      .subscribe(
        response => {
          this.items = response.items;
          this.chunks = chunkBy(this.items, 2);
        },
        response => this.toastService.response(response)
      );
  }

  public deleteContact(id: number) {
    this.api.request('DELETE', 'contacts/' + id).subscribe(
      () => {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].id === id) {
            this.items.splice(i, 1);
            break;
          }
        }
        this.chunks = chunkBy(this.items, 2);
      },
      response => this.toastService.response(response)
    );
    return false;
  }
}
