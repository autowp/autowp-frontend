import {Injectable} from '@angular/core';
import {Observable, throwError, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ContactsClient} from '../../../generated/spec.pbsc';
import {ContactItems, GetContactRequest, GetContactsRequest} from '../../../generated/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface APIContactsGetOptions {
  fields: string[];
}

@Injectable()
export class ContactsService {
  constructor(private auth: AuthService, private contactsClient: ContactsClient) {}

  public isInContacts(userId: string): Observable<boolean> {
    return this.contactsClient.getContact(new GetContactRequest({userId})).pipe(
      map((response) => !!response.contactUserId),
      catchError((err: GrpcStatusEvent) => {
        if (err.statusCode === 5) {
          return of(false);
        }

        return throwError(err);
      })
    );
  }

  public getContacts(options: APIContactsGetOptions): Observable<ContactItems> {
    // (.pipe(
    const request = new GetContactsRequest({fields: []});

    if (options.fields) {
      request.fields = options.fields;
    }

    return this.auth.getUser().pipe(switchMap(() => this.contactsClient.getContacts(request)));
  }
}
