import {Injectable, NotFoundException} from "@nestjs/common";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";
import {User} from "../auth/user.entity";
import {GetUser} from "../auth/get-user.decorator";

//boards의 모든 정보가 입력되는 곳
@Injectable()
export class BoardsService {
    constructor(
        /**
         * @InjectRepository 를 이용해 종속성 주입
         * 서비스에서 Repository 를 이용한다고 알림
         */
        @InjectRepository(Board)
        private boardRepository: BoardRepository
    ) {
    }

    async createBoard(createBoardDto: CreateBoardDto,user:User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board :Board= this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        });

        await this.boardRepository.save(board);
        return board;
    }


    async getBoardById(id: number): Promise<Board> {
      const found = await this.boardRepository.findOne({ where: { id: id } });

      if (!found) {
        throw new NotFoundException(`can't find Board with id ${id}`);
      }
      return found;
    }
    async  getAllBoards(
        @GetUser() user:User
    ): Promise<Board[]>{
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany()

        return boards;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected ===0){
            throw new NotFoundException(`Can't find Board with id ${id}  `)
        }
        console.log('result', result);
    }

    async updateBoardStatus(id :number , status : BoardStatus) : Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

}
