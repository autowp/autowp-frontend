import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {StatisticsClient} from '@grpc/spec.pbsc';
import {PulseRequest} from '@grpc/spec.pb';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {ChartConfiguration} from 'chart.js';
import {UserService} from '@services/user';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html',
})
export class PulseComponent implements OnInit {
  protected readonly periods: {
    value: PulseRequest.Period;
    name: string;
    active: boolean;
  }[] = [
    {
      value: PulseRequest.Period.DEFAULT,
      name: 'Day',
      active: true,
    },
    {
      value: PulseRequest.Period.MONTH,
      name: 'Month',
      active: false,
    },
    {
      value: PulseRequest.Period.YEAR,
      name: 'Year',
      active: false,
    },
  ];

  private readonly period$ = new BehaviorSubject<PulseRequest.Period>(PulseRequest.Period.DEFAULT);

  protected readonly chartOptions: ChartConfiguration<'bar', any, any>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  protected readonly data$ = this.period$.pipe(
    debounceTime(10),
    distinctUntilChanged(),
    switchMap((period) => this.grpc.getPulse(new PulseRequest({period}))),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    shareReplay(1)
  );

  protected readonly legend$ = this.data$.pipe(
    map((response) => {
      return response.legend.map((item) => ({
        color: item.color,
        user$: this.usersService.getUser$(parseInt(item.userId, 10), {}),
      }));
    })
  );

  protected readonly labels$ = this.data$.pipe(map((response) => response.labels));

  protected readonly gridData$ = this.data$.pipe(
    switchMap((response) =>
      combineLatest(
        response.grid.map((dataset) =>
          combineLatest([this.usersService.getUser$(parseInt(dataset.userId, 10), {}), of(dataset)])
        )
      )
    ),
    map((response) => ({
      data: response.map(([user, dataset]) => ({
        label: user.name,
        data: dataset.line,
      })),
    }))
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly grpc: StatisticsClient,
    private readonly usersService: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 161}), 0);
  }

  protected selectPeriod(period) {
    for (const p of this.periods) {
      p.active = false;
    }
    period.active = true;
    this.period$.next(period.value);

    return false;
  }
}
