import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserRepository} from "./user.repository";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        /**
         * @InjectRepository 를 이용해 종속성 주입
         * 서비스에서 Repository 를 이용한다고 알림
         */
        @InjectRepository(User)
        private userRepository: UserRepository,
        private jwtService: JwtService
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

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken}> {
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOne({where: {username: username}});

        if (user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 ( Secret + Payload)
            //Payload에는 중요한 정보는 넣으면 안됨, 토큰으로 가져가기 쉬움
            const payload={username}
            const accessToken = await this.jwtService.sign(payload)
            return {accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

}
