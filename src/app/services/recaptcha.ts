import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {ReCaptchaConfig} from '@grpc/spec.pb';

@Injectable()
export class ReCaptchaService {
  constructor(private grpc: AutowpClient) {}

  public get$(): Observable<ReCaptchaConfig> {
    return this.grpc.getReCaptchaConfig(new Empty());
  }
}
