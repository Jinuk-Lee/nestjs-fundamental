import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BoardsStatus} from "./board-status.enum";

@Entity()
//CREATE TABLE board 부분
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() //id 열이 기본키 열임을 나타낸다.
    id : number;

    @Column()
    title:string;

    @Column
    description : string;

    @Column()
    status : BoardsStatus;
}