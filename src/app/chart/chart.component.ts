import {Component} from '@angular/core';
import {PageEnvService} from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import {APIService} from '../services/api.service';
import {ChartOptions} from 'chart.js';

export interface APIChartParameter {
  id: number;
  name: string;
  active: boolean;
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
  years: any[];
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  public parameters: APIChartParameter[] = [];
  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public chart = {
    data: [],
    labels: [],
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
  };

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);

    this.api.request<APIChartParameters>('GET', 'chart/parameters').subscribe({
      next: (response) => {
        this.parameters = response.parameters;
        this.selectParam(this.parameters[0]);
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  private loadData(id: number) {
    this.chart.data = [];

    this.api
      .request<APIChartData>('GET', 'chart/data', {
        params: {id: id.toString()},
      })
      .subscribe({
        next: (response) => {
          this.chart.data = response.datasets.map((dataset) => ({
            label: dataset.name,
            data: dataset.values,
          }));
          this.chart.labels = response.years;
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  public selectParam(param: APIChartParameter) {
    for (const p of this.parameters) {
      p.active = false;
    }
    param.active = true;
    this.loadData(param.id);

    return false;
  }
}
