import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board, BoardsStatus } from "./boards.model";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }

  @Get("/")
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param("id") id: string): Board { //게시물 하나만 리턴함.
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param("id") id: string): void {
    this.boardsService.deleteBoard(id);  //deleteBoard함수 호출
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id :string,
    @Body('status') status : BoardsStatus
  ) {
    this.boardsService.updateBoardStatus(id,status);
  }
}


