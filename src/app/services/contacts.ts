import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import {catchError, map, switchMapTo} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {AutowpClient} from '../../../generated/spec.pbsc';
import {ContactItems, GetContactRequest, GetContactsRequest} from '../../../generated/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface APIContactsGetOptions {
  fields: string[];
}

@Injectable()
export class ContactsService {
  constructor(private auth: AuthService, private grpc: AutowpClient) {}

  public isInContacts(userId: number): Observable<boolean> {
    return this.grpc.getContact(new GetContactRequest({userId})).pipe(
      map(response => !!response.contactUserId),
      catchError((err: GrpcStatusEvent) => {
        if (err.statusCode === 5) {
          return of(false);
        }

        return throwError(err);
      })
    );
  }

  public getContacts(
    options: APIContactsGetOptions
  ): Observable<ContactItems> {

    // (.pipe(
    const request = new GetContactsRequest({fields: []});

    if (options.fields) {
      request.fields = options.fields;
    }

    return this.auth.getUser().pipe(
      switchMapTo(this.grpc.getContacts(request))
    );
  }
}
