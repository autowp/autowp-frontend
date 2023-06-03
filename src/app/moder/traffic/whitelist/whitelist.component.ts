import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {TrafficClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {APITrafficWhitelistItem, DeleteFromTrafficWhitelistRequest} from '@grpc/spec.pb';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-moder-traffic-whitelist',
  templateUrl: './whitelist.component.html',
})
export class ModerTrafficWhitelistComponent implements OnInit {
  private readonly reload$ = new BehaviorSubject<void>(null);

  protected readonly items$: Observable<APITrafficWhitelistItem[]> = combineLatest([
    this.grpc.getWhitelist(new Empty()),
    this.reload$,
  ]).pipe(
    map(([response]) => response.items),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    })
  );

  constructor(
    private readonly grpc: TrafficClient,
    private readonly router: Router,
    private readonly pageEnv: PageEnvService
  ) {}

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
      0
    );
  }
}
