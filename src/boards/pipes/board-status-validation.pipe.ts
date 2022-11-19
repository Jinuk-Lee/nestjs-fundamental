import {ArgumentMetadata, PipeTransform} from "@nestjs/common";
import {BoardsStatus} from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform{
    readonly StatusOptions = [
        BoardsStatus.PRIVATE
    ]


    transform(value: any, metadata: ArgumentMetadata){
        console.log('value',value);
        console.log('metadata',metadata);

        return value;
    }
}