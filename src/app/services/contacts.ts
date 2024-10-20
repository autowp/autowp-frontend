import {inject, Injectable} from '@angular/core';
import {ContactItems, GetContactRequest, GetContactsRequest} from '@grpc/spec.pb';
import {ContactsClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {AuthService} from './auth.service';

export interface APIContactsGetOptions {
  fields: string[];
}

@Injectable()
export class ContactsService {
  private readonly auth = inject(AuthService);
  private readonly contactsClient = inject(ContactsClient);

  public isInContacts$(userId: string): Observable<boolean> {
    return this.contactsClient.getContact(new GetContactRequest({userId})).pipe(
      map((response) => !!response.contactUserId),
      catchError((err: unknown) => {
        if (err instanceof GrpcStatusEvent && err.statusCode === 5) {
          return of(false);
        }

        return throwError(() => err);
      }),
    );
  }

  public getContacts$(): Observable<ContactItems> {
    return this.auth.getUser$().pipe(switchMap(() => this.contactsClient.getContacts(new GetContactsRequest({}))));
  }
}
