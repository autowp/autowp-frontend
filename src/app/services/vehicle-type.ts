import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APIService } from './api.service';
import {getVehicleTypeTranslation} from '../utils/translations';

export interface APIVehicleType {
  id: number;
  name: string;
  catname: string;
  nameTranslated?: string;
  childs: APIVehicleType[];
}

export interface APIVehicleTypesGetResponse {
  items: APIVehicleType[];
}

@Injectable()
export class VehicleTypeService {
  private readonly types$: Observable<APIVehicleType[]>;

  constructor(private api: APIService) {
    this.types$ = this.api
      .request<APIVehicleTypesGetResponse>('GET', 'vehicle-types')
      .pipe(
        map(data => {
          this.applyTranslations(data.items);
          return data.items;
        }),
        shareReplay(1)
      );
  }

  private applyTranslations(types: APIVehicleType[]) {
    this.walkTypes(types, (type: APIVehicleType) => {
      type.nameTranslated = getVehicleTypeTranslation(type.name);
    });
  }

  private walkTypes(
    types: APIVehicleType[],
    callback: (type: APIVehicleType) => void
  ) {
    for (const type of types) {
      callback(type);
      this.walkTypes(type.childs, callback);
    }
  }

  public getTypes(): Observable<APIVehicleType[]> {
    return this.types$;
  }

  public getTypesById(ids: number[]): Observable<APIVehicleType[]> {
    if (ids.length <= 0) {
      return of([]);
    }
    return this.types$.pipe(
      map(types => {
        const result: APIVehicleType[] = [];
        this.walkTypes(types, type => {
          if (ids.includes(type.id)) {
            result.push(type);
          }
        });
        return result;
      })
    );
  }
}
