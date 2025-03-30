import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AttrAttributeType, ChartDataRequest, ChartParameter} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {ChartOptions} from 'chart.js';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ObjectTyped} from 'object-typed';

import {ToastsService} from '../toasts/toasts.service';

@Component({
  imports: [RouterLink, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #attrsClient = inject(AttrsClient);

  protected parameters: ChartParameter[] = [];
  protected activeParameter = 0;
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
      data: (null | number)[];
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
    setTimeout(() => this.#pageEnv.set({pageId: 1}), 0);

    this.#attrsClient.getChartParameters(new Empty()).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: (response) => {
        this.parameters = response.parameters || [];
        this.selectParam(0);
      },
    });
  }

  private loadData(id: string) {
    this.chart.data = [];

    this.#attrsClient.getChartData(new ChartDataRequest({id})).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: (response) => {
        const datasets = response.datasets || [];
        const yearsSet = new Set<number>();
        datasets.forEach((dataset) => {
          ObjectTyped.keys(dataset.values).forEach((key) => yearsSet.add(key));
        });
        const years = Array.from(yearsSet.keys()).sort((a, b) => a - b);

        this.chart.labels = years;
        this.chart.data = datasets.map((dataset) => {
          const numbers: (null | number)[] = [];
          years.forEach((year) => {
            const value = dataset.values[year];
            let numberValue: null | number = null;
            if (value) {
              switch (value.type) {
                case AttrAttributeType.Id.FLOAT:
                  numberValue = value.floatValue;
                  break;
                case AttrAttributeType.Id.INTEGER:
                  numberValue = value.intValue;
                  break;
              }
            }
            numbers.push(numberValue);
          });

          return {
            data: numbers,
            label: dataset.name,
          };
        });
      },
    });
  }

  protected selectParam(number: number) {
    this.activeParameter = number;
    this.loadData(this.parameters[this.activeParameter].id);

    return false;
  }
}
