import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {BoardsStatus} from "../board-status.enum";


export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardsStatus.PRIVATE,
        BoardsStatus.PUBLIC
    ]


    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't int the status options`);

        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }
}