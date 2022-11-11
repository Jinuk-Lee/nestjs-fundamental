import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = []; //다른 컴포턴트의 수정을 막기위해 private 사용


  getAllBoards(){
    return this.boards;  //boards배열의 모든 값을 가져옴.
  }
}
