import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APITrafficWhitelistItem, DeleteFromTrafficWhitelistRequest} from '@grpc/spec.pb';
import {TrafficClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-moder-traffic-whitelist',
  templateUrl: './whitelist.component.html',
})
export class ModerTrafficWhitelistComponent implements OnInit {
  private readonly grpc = inject(TrafficClient);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);

  private readonly reload$ = new BehaviorSubject<void>(void 0);

  protected readonly items$: Observable<APITrafficWhitelistItem[]> = combineLatest([
    this.grpc.getWhitelist(new Empty()),
    this.reload$,
  ]).pipe(
    map(([response]) => (response.items ? response.items : [])),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
  );

  protected deleteItem(item: APITrafficWhitelistItem) {
    this.grpc.deleteFromWhitelist(new DeleteFromTrafficWhitelistRequest({ip: item.ip})).subscribe(() => {
      this.reload$.next();
    });
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 77,
        }),
      0,
    );
  }
}
