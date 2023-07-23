import {Injectable} from '@angular/core';
import {VODDataResponse} from '@grpc/spec.pb';
import {DonationsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonateService {
  constructor(private readonly grpc: DonationsClient) {}

  public getVOD$(): Observable<VODDataResponse> {
    return this.grpc.getVODData(new Empty());
  }
}
