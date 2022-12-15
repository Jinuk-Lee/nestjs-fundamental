import {Body, Controller, Post, Req, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credential.dto";
import {User} from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authcredentialsDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe)authcredentialsDto : AuthCredentialsDto):Promise<{accessToken}> {
        return this.authService.signIn(authcredentialsDto);
    }
    @Post('/test')
    test(@Req() req){
        console.log('req',req);
    }
}
