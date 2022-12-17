import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import {Board} from "./board.entity";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import {BoardStatus} from "./board-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../auth/user.entity";
import {GetUser} from "../auth/get-user.decorator";

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }
  @Get('/:id')
  getBoardById(@Param ('id') id :number) : Promise <Board>{
    return this.boardsService.getBoardById(id);

  }
  @Get()
  getAllBoard(
      @GetUser() user:User
  ): Promise<Board[]>{
    return this.boardsService.getAllBoards(user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
  @Body() createBoardDto: CreateBoardDto,
  @GetUser() user: User,
  ): Promise<Board>{
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id',ParseIntPipe)id ):Promise<void>{
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
      @Param('id',ParseIntPipe) id:number,
      @Body('status', BoardStatusValidationPipe) status : BoardStatus,
      ): Promise<Board>{
    return this.boardsService.updateBoardStatus(id, status);
  }

}


