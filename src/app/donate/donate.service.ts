import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DonationsClient} from '../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {VODDataResponse} from '../../../generated/spec.pb';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private grpc: DonationsClient) {}

  public getVOD(): Observable<VODDataResponse> {
    return this.grpc.getVODData(new Empty());
  }
}
