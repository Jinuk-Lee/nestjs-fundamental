import {Injectable, NotFoundException} from "@nestjs/common";
import {Board, BoardsStatus} from "./boards.model";
import {v1 as uuid} from "uuid";
import {CreateBoardDto} from "./dto/create-board.dto";

//boards의 모든 정보가 입력되는 곳
@Injectable()
export class BoardsService {
    private boards: Board[] = []; //다른 컴포턴트의 수정을 막기위해 private 사용
    //boards의 형식을 Board타입으로 설정,여러값이기 때문에 Board[]

    getAllBoards(): Board[] {
        return this.boards;  //boards배열의 모든 값을 가져옴.
    }

    createBoard(createBoardDto: CreateBoardDto) { //게시물 생성
        const {title, description} = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardsStatus.PUBLIC
        };
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't find Bord with id ${id}`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardsStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
