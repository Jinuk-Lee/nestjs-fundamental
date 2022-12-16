import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Board} from "../boards/board.entity";
@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password:string;

    @OneToMany(type => Board,board=>board.user,{eager:true})
        // eager:true -> user정보를 가져올 때 board 정보도 가져옴,
        // eager:false -> 반대
    boards: Board[]
}
