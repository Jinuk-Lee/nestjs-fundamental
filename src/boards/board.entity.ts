import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BoardStatus} from "./board-status.enum";

@Entity()
//CREATE TABLE board 부분
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() //id 열이 기본키 열임을 나타낸다.
    id : number;

    @Column() //@Column()은 기본키가 아닌 열
    title:string;

    @Column()
    description : string;

    @Column()
    status : BoardStatus;
}