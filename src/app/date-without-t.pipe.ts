import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithoutT',
  standalone: true
})
export class DateWithoutTPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): unknown {
    return value?.split('T')[0];
  }

}
