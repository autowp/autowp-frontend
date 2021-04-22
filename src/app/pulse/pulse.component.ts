import { Component, OnInit } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';
import { APIUser } from '../services/user';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

export interface APIPulseResponse {
  legend: {
    color: string;
    user: APIUser;
  }[];
  grid: {
    line: number[];
    color: string;
    label: string;
  }[];
  labels: string[];
}

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html'
})
export class PulseComponent implements OnInit {

  public legend: {
    color: string;
    user: APIUser;
  }[] = [];

  public periods = [
    {
      value: 'day',
      name: 'Day',
      active: true
    },
    {
      value: 'month',
      name: 'Month',
      active: false
    },
    {
      value: 'year',
      name: 'Year',
      active: false
    }
  ];

  private period = 'day';

  public chart = {
    data: [],
    labels: [],
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
    colors: []
  };

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService) {

  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Pulse`,
          pageId: 161
        }),
      0
    );
    this.loadData();
  }

  private loadData() {
    this.chart.data = [];

    this.api.request<APIPulseResponse>('GET', 'pulse', {params: {period: this.period}}).subscribe(
      response => {
        this.chart.data = response.grid.map(dataset => ({
          label: dataset.label,
          data: dataset.line
        }));
        this.chart.colors = response.grid.map(dataset => ({
          backgroundColor: dataset.color,
          borderColor: dataset.color,
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }));

        this.chart.labels = response.labels;
        this.legend = response.legend;
      },
      response => this.toastService.response(response)
    );
  }

  public selectUser(i: number) {
    this.chart.colors[i].backup = this.chart.colors[i].backgroundColor;
    this.chart.colors[i].backgroundColor = 'blue';
  }

  public deselectUser(i: number) {
    this.chart.colors[i].backgroundColor = this.chart.colors[i].backup;
  }

  public selectPeriod(period) {
    for (const p of this.periods) {
      p.active = false;
    }
    period.active = true;
    this.period = period.value;
    this.loadData();

    return false;
  }
}
