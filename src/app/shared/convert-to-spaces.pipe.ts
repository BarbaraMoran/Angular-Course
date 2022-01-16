import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform {
//elimina el guión de la palabra
  transform(value: string, character: string): string {
    return value.replace(character, '');
  }

}
