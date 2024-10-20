import {Component, inject, OnInit} from '@angular/core';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {ChartOptions} from 'chart.js';

import {ToastsService} from '../toasts/toasts.service';

export interface APIChartParameter {
  active: boolean;
  id: number;
  name: string;
}

export interface APIChartParameters {
  parameters: APIChartParameter[];
}

export interface APIChartDataset {
  name: string;
  values: number[];
}

export interface APIChartData {
  datasets: APIChartDataset[];
  years: number[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  private readonly api = inject(APIService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected parameters: APIChartParameter[] = [];
  protected readonly chartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  protected readonly chart: {
    colors: {
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
    }[];
    data: {
      data: number[];
      label: string;
    }[];
    labels: number[];
  } = {
    colors: [
      {
        backgroundColor: 'rgba(41,84,109,1)',
        borderColor: 'rgba(41,84,109,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
      {
        backgroundColor: 'rgba(242,80,122,1)',
        borderColor: 'rgba(242,80,122,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
    data: [],
    labels: [],
  };

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);

    this.api.request<APIChartParameters>('GET', 'chart/parameters').subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: (response) => {
        this.parameters = response.parameters;
        this.selectParam(this.parameters[0]);
      },
    });
  }

  private loadData(id: number) {
    this.chart.data = [];

    this.api
      .request<APIChartData>('GET', 'chart/data', {
        params: {id: id.toString()},
      })
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: (response) => {
          this.chart.data = response.datasets.map((dataset) => ({
            data: dataset.values,
            label: dataset.name,
          }));
          this.chart.labels = response.years;
        },
      });
  }

  protected selectParam(param: APIChartParameter) {
    for (const p of this.parameters) {
      p.active = false;
    }
    param.active = true;
    this.loadData(param.id);

    return false;
  }
}
