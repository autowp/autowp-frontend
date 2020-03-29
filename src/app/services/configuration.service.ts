import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { APIService } from './api.service';

interface Configuration {
  brands: string[];
}

@Injectable()
export class ConfigurationService {
  private configData: Configuration;

  constructor(private api: APIService) { }

  loadConfigurationData(): Observable<Configuration> {
    const o = this.api
      .request<Configuration>('GET', 'config');

    o.subscribe(result => {
      this.configData = result;
    });
    return o;
  }

  get config(): Configuration {
    return this.configData;
  }
}
