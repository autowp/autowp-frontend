import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { APIUser } from './user';
import {catchError, map, switchMapTo} from 'rxjs/operators';
import { APIService } from './api.service';
import {AuthService} from './auth.service';

export interface APIContactsGetOptions {
  fields: string;
}

export interface APIContactsGetResponse {
  items: APIUser[];
}

export interface APIContactsContactGetResponse {
  contact_user_id: number;
}

@Injectable()
export class ContactsService {
  constructor(private api: APIService, private auth: AuthService) {}

  public isInContacts(userId: number): Observable<boolean> {
    return this.api
      .request<APIContactsContactGetResponse>('GET', 'contacts/' + userId)
      .pipe(
        map(response => !!response.contact_user_id),
        catchError(err => {
          if (err.status === 404) {
            return of(false);
          }

          return throwError(err);
        })
      );
  }

  public getContacts(
    options: APIContactsGetOptions
  ): Observable<APIContactsGetResponse> {
    const params: { [param: string]: string } = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    return this.auth.getUser().pipe(
      switchMapTo(this.api.request<APIContactsGetResponse>('GET', 'contacts', {
        params
      }))
    );
  }
}
