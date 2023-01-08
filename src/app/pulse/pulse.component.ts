import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {StatisticsClient} from '@grpc/spec.pbsc';
import {PulseRequest} from '@grpc/spec.pb';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {ChartConfiguration} from 'chart.js';
import {UserService} from '../services/user';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html',
})
export class PulseComponent implements OnInit {
  public periods: {
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

  private period$ = new BehaviorSubject<PulseRequest.Period>(PulseRequest.Period.DEFAULT);

  public chartOptions: ChartConfiguration<'bar', any, any>['options'] = {
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

  public data$ = this.period$.pipe(
    debounceTime(10),
    distinctUntilChanged(),
    switchMap((period) => this.grpc.getPulse(new PulseRequest({period}))),
    catchError((response) => {
      this.toastService.grpcErrorResponse(response);
      return EMPTY;
    }),
    shareReplay(1)
  );

  public legend$ = this.data$.pipe(
    map((response) => {
      return response.legend.map((item) => ({
        color: item.color,
        user$: this.usersService.getUser(parseInt(item.userId, 10), {}),
      }));
    })
  );

  public labels$ = this.data$.pipe(map((response) => response.labels));

  public gridData$ = this.data$.pipe(
    switchMap((response) =>
      combineLatest(
        response.grid.map((dataset) =>
          combineLatest([this.usersService.getUser(parseInt(dataset.userId, 10), {}), of(dataset)])
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
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: StatisticsClient,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 161}), 0);
  }

  public selectPeriod(period) {
    for (const p of this.periods) {
      p.active = false;
    }
    period.active = true;
    this.period$.next(period.value);

    return false;
  }
}
