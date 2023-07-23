import {Injectable} from '@angular/core';
import {ReCaptchaConfig} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';

@Injectable()
export class ReCaptchaService {
  constructor(private readonly grpc: AutowpClient) {}

  public get$(): Observable<ReCaptchaConfig> {
    return this.grpc.getReCaptchaConfig(new Empty());
  }
}
