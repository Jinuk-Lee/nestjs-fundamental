import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardsStatus} from "./board-status.enum";


export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardsStatus.PUBLIC
        })

        await this.save(board);
        return board;

    }
}