import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { Board } from "./boards.model";
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

  @Get("/:id")
  getBoardById(@Param("id") id: string): Board { //게시물 하나만 리턴함.
    return this.boardsService.getBoardById(id);
  }
}


