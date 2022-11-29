import {Injectable, NotFoundException} from "@nestjs/common";
import {BoardsStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";

//boards의 모든 정보가 입력되는 곳
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {
    }

    // //boards의 형식을 Board타입으로 설정,여러값이기 때문에 Board[]
    //
    // getAllBoards(): Board[] {
    //     return this.boards;  //boards배열의 모든 값을 가져옴.
    // }
    //
    // createBoard(createBoardDto: CreateBoardDto) { //게시물 생성
    //     const {title, description} = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardsStatus.PUBLIC
    //     };
    //     this.boards.push(board);
    //     return board;
    // }
    //
    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardsStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);
        //constructor에 boardRepository를 주입했기 때문에 사용이 가능해짐.

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }


    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //
    //     if (!found) {
    //         throw new NotFoundException(`Can't find Bord with id ${id}`);
    //     }
    //     return found;
    // }
    //
    async  deleteBoard(id : number) : Promise<void> {
        const result = await  this.boardRepository.delete(id);

        console.log('result',result);
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    //
    // updateBoardStatus(id: string, status: BoardsStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
