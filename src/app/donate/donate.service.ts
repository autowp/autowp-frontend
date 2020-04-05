import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../services/api.service';

export interface APIDonateCarOfDayDate {
  name: string;
  value: string;
  free: boolean;
}

export interface APIDonateVODGetResponse {
  sum: number;
  dates: APIDonateCarOfDayDate[];
}

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private api: APIService) {}

  public getVOD(): Observable<APIDonateVODGetResponse> {
    return this.api.request<APIDonateVODGetResponse>('GET', 'donate/vod');
  }
}
