import {BaseEntity, Column, Entity} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm/browser";
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password:string;
}
