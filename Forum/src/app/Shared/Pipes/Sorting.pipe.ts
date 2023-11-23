import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'MySortingPipe'
})


export class MySortingPipePipe implements PipeTransform {


  transform(myArray: any[], fieldName: string): any[] {

    if (myArray) {

      myArray = myArray.sort(function (elementFirst: any, elementSecond: any) {

        let a: any = elementFirst[fieldName];
        let b: any = elementSecond[fieldName];

        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }

      });

    }
    return myArray;
  }
}
