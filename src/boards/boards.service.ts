import { Injectable } from "@nestjs/common";
import { Board, BoardsStatus } from "./boards.model";
import {v1 as uuid} from 'uuid';
//boards의 모든 정보가 입력되는 곳
@Injectable()
export class BoardsService {
  private boards: Board[] = []; //다른 컴포턴트의 수정을 막기위해 private 사용
  //boards의 형식을 Board타입으로 설정,여러값이기 때문에 Board[]

  getAllBoards(): Board[] {
    return this.boards;  //boards배열의 모든 값을 가져옴.
  }

  createBoard(title: string, description: string) { //게시물 생성
    const board: Board = {
      id : uuid(),
      title,
      description,
      status: BoardsStatus.PUBLIC
    };
    this.boards.push(board);
    return board;
  }
}
