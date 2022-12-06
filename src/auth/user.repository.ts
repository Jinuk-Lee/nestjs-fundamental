import {Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialDto} from "./dto/auth-credential.dto";

export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = this.create({username, password});

        await this.save(user);
    }
}