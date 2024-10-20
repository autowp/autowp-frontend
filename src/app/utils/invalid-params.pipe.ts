import {Pipe, PipeTransform} from '@angular/core';

export type InvalidParams = {[key: string]: {[key: string]: string}};

@Pipe({
  name: 'invalidParams',
  standalone: true,
})
export class InvalidParamsPipe implements PipeTransform {
  transform(errors: {[key: string]: {[key: string]: string}} | undefined, field: string): string[] {
    let errorsArr: string[] = [];

    if (errors && errors[field]) {
      errorsArr = Object.values(errors[field]);
    }

    return errorsArr;
  }
}
