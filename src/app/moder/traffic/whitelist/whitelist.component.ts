import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { PageEnvService } from '../../../services/page-env.service';
import {AutowpClient} from '../../../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {APITrafficWhitelistItem, DeleteFromTrafficWhitelistRequest} from '../../../../../generated/spec.pb';

@Component({
  selector: 'app-moder-traffic-whitelist',
  templateUrl: './whitelist.component.html'
})
export class ModerTrafficWhitelistComponent {
  public items: APITrafficWhitelistItem[];

  constructor(
    private grpc: AutowpClient,
    private router: Router,
    private pageEnv: PageEnvService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: $localize `Traffic`,
          pageId: 77
        }),
      0
    );

    this.grpc.getTrafficWhitelist(new Empty()).subscribe(
      response => {
        this.items = response.items;

        /*for(const item of $scope.items) {
              ipService.getHostByAddr(item.ip).subscribe((hostname) => {
                  item.hostname = hostname;
              });
          }*/
      },
      () => {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
      }
    );
  }

  public deleteItem(item: APITrafficWhitelistItem) {
    this.grpc.deleteFromTrafficWhitelist(new DeleteFromTrafficWhitelistRequest({ip: item.ip})).subscribe(() => {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    });
  }
}
