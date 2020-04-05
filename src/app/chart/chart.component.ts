import { Component, Injectable } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

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
  templateUrl: './chart.component.html'
})
@Injectable()
export class ChartComponent {
  public parameters: APIChartParameter[] = [];
  public chart = {
    data: [],
    labels: [],
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    colors: [
      {
        backgroundColor: 'rgba(41,84,109,1)',
        borderColor: 'rgba(41,84,109,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {
        backgroundColor: 'rgba(242,80,122,1)',
        borderColor: 'rgba(242,80,122,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ]
  };

  constructor(private api: APIService, private pageEnv: PageEnvService, private toastService: ToastsService) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: 'Charts',
          pageId: 1
        }),
      0
    );

    this.api.request<APIChartParameters>('GET', 'chart/parameters').subscribe(
      response => {
        this.parameters = response.parameters;
        this.selectParam(this.parameters[0]);
      },
      response => this.toastService.response(response)
    );
  }

  private loadData(id: number) {
    this.chart.data = [];

    this.api
      .request<APIChartData>('GET', 'chart/data', {
        params: { id: id.toString() }
      })
      .subscribe(
        response => {
          const datasets: any[] = [];
          for (const dataset of response.datasets) {
            datasets.push({
              label: dataset.name,
              data: dataset.values
            });
          }

          this.chart.data = datasets;
          this.chart.labels = response.years;
        },
        response => this.toastService.response(response)
      );
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
