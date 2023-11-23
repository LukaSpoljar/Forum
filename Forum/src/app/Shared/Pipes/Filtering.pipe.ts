import {Pipe, PipeTransform} from "@angular/core";
import {MyComment} from "../Models/MyComment";


@Pipe({
  name: 'MyFilterPipe'
})

export class MyFilterPipePipe implements PipeTransform {

  transform(tmpFilteringArray: MyComment[], fieldName: string, myQuery: string, originalArray: MyComment[]): MyComment[] {

    if (Array.isArray(tmpFilteringArray)) {
      tmpFilteringArray = originalArray.filter((element: any) => element[fieldName].includes(myQuery));
    }

    return tmpFilteringArray;
  }
}



