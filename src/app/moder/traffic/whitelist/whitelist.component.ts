import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {APITrafficWhitelistItem, DeleteFromTrafficWhitelistRequest} from '@grpc/spec.pb';
import {TrafficClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
  selector: 'app-moder-traffic-whitelist',
  templateUrl: './whitelist.component.html',
})
export class ModerTrafficWhitelistComponent implements OnInit {
  readonly #grpc = inject(TrafficClient);
  readonly #router = inject(Router);
  readonly #pageEnv = inject(PageEnvService);

  readonly #reload$ = new BehaviorSubject<void>(void 0);

  protected readonly items$: Observable<APITrafficWhitelistItem[]> = combineLatest([
    this.#grpc.getWhitelist(new Empty()),
    this.#reload$,
  ]).pipe(
    map(([response]) => (response.items ? response.items : [])),
    catchError(() => {
      this.#router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
  );

  protected deleteItem(item: APITrafficWhitelistItem) {
    this.#grpc.deleteFromWhitelist(new DeleteFromTrafficWhitelistRequest({ip: item.ip})).subscribe(() => {
      this.#reload$.next();
    });
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.#pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 77,
        }),
      0,
    );
  }
}
