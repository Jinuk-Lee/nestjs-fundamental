import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port: 5432, //postgres default port
    username : 'postgres',
    password : 'postgres',
    database : 'boards-app',
    entities:[__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}