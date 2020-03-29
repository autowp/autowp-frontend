import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

interface Configuration {
  brands: string[];
}

@Injectable()
export class ConfigurationService {
  private configData: Configuration;

  constructor(private http: HttpClient) { }

  loadConfigurationData(): Observable<Configuration> {
    const o = this.http
      .get<Configuration>('/api/config');

    o.subscribe(result => {
      this.configData = result;
    });
    return o;
  }

  get config(): Configuration {
    return this.configData;
  }
}
