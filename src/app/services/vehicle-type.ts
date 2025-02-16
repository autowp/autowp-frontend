import {inject, Injectable} from '@angular/core';
import {VehicleType} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

export interface APIVehicleType {
  catname: string;
  childs: APIVehicleType[];
  id: number;
  name: string;
  nameTranslated?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  readonly #grpc = inject(AutowpClient);

  readonly #types$: Observable<VehicleType[]> = this.#grpc.getVehicleTypes(new Empty()).pipe(
    map((data) => (data.items ? data.items : [])),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private walkTypes(types: VehicleType[], callback: (type: VehicleType) => void) {
    for (const type of types) {
      callback(type);
      this.walkTypes(type.childs ? type.childs : [], callback);
    }
  }

  public getTypes$(): Observable<VehicleType[]> {
    return this.#types$;
  }

  public getTypesPlain$(): Observable<VehicleType[]> {
    return this.#types$.pipe(
      map((types) => {
        const result: VehicleType[] = [];
        this.walkTypes(types, (type) => {
          result.push(type);
        });
        return result;
      }),
    );
  }
}
