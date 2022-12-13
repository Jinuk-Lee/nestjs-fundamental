import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        /**
         * @InjectRepository 를 이용해 종속성 주입
         * 서비스에서 Repository 를 이용한다고 알림
         */
        @InjectRepository(User)
        private userRepository: UserRepository
    ) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            username,
            password: hashedPassword
        });
        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
            console.log('error', error);
        }
        return user;
    }
}
