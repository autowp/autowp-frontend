import {Injectable} from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ContactsClient} from '@grpc/spec.pbsc';
import {ContactItems, GetContactRequest, GetContactsRequest} from '@grpc/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface APIContactsGetOptions {
  fields: string[];
}

@Injectable()
export class ContactsService {
  constructor(private readonly auth: AuthService, private readonly contactsClient: ContactsClient) {}

  public isInContacts$(userId: string): Observable<boolean> {
    return this.contactsClient.getContact(new GetContactRequest({userId})).pipe(
      map((response) => !!response.contactUserId),
      catchError((err: unknown) => {
        if (err instanceof GrpcStatusEvent && err.statusCode === 5) {
          return of(false);
        }

        return throwError(() => err);
      })
    );
  }

  public getContacts$(): Observable<ContactItems> {
    return this.auth.getUser$().pipe(switchMap(() => this.contactsClient.getContacts(new GetContactsRequest({}))));
  }
}
