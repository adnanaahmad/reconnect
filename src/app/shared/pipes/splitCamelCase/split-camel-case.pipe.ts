import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      var output, i, l, capRe = /[A-Z]/;
      if (typeof(value) !== 'string') {
        throw new Error('The "value" parameter must be a string.');
      }
      output = [];
      for (i = 0, l = value.length; i < l; i += 1) {
        if (i === 0) {
          output.push(value[i].toUpperCase());
        }
        else {
          if (i > 0 && capRe.test(value[i])) {
            output.push(' ');
          }
          output.push(value[i]);
        }
      }
      return output.join('');
  }

}
