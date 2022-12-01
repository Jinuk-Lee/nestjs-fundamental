import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import {Board} from "./board.entity";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }
  @Get('/:id')
  getBoardById(@Param ('id') id :number) : Promise <Board>{
    return this.boardsService.getBoardById(id);

  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDto : CreateBoardDto): Promise<Board>{
    return this.boardsService.createBoard(CreateBoardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id',ParseIntPipe)id ):Promise<void>{
    return this.boardsService.deleteBoard(id);
  }

}


