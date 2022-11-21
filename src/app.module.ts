import {Module} from '@nestjs/common';
import {BoardsModule} from "./boards/boards.module";

@Module({
    imports:
        TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule],
})

export class AppModule {
}