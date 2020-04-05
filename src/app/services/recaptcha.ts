import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

export interface APIReCaptchaGetResponse {
  publicKey: string;
  success: boolean;
}

@Injectable()
export class ReCaptchaService {
  constructor(private api: APIService) {}

  public get(): Observable<APIReCaptchaGetResponse> {
    return this.api.request<APIReCaptchaGetResponse>('GET', 'recaptcha');
  }
}
