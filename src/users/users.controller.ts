import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Session, UseGuards } from '@nestjs/common';
import { SignupDto, UpdateUserDto, UserDto } from './dtos';
import { UsersService } from './users.service';
import { SerializeUser } from 'src/interceptors';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin-dto';
import { CurrentUser } from './decorators';
import { User } from './user.entity';
import { AuthGuard } from './guards';

// @UseInterceptors(new SerializeInterceptor(UserDto))
@SerializeUser(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @UseGuards(AuthGuard)
    @Post('signout')
    signout(@Session() session: any) {
        session.userId = null;
    }

    // @Get('whoami')
    // whoAMI(@Session() session: any) {
    //     return this.usersService.findOneById(session.userId);
    // }

    @UseGuards(AuthGuard)
    @Get('whoami')
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('signup')
    async signup(@Body() signupUserDto: SignupDto, @Session() session: any) {
        const {email, password} = signupUserDto;
        const user = await this.authService.signup(email,password);
        session.userId = user.id;
        return user;
    }
    @Post('signin')
    async signin(@Body() signinDto: SigninDto, @Session() session: any) {
        const {email, password} = signinDto;
        const user = await this.authService.signin(email,password);
        session.userId = user.id;
        return user;
    }


    @Get(':id')
    findOneById(@Param('id') id: number){
        return this.usersService.findOneById(id);
    }

    @Get()
    findAll(@Query('email') email: string) {
        if(!email){
            return this.usersService.findAll();
        } 
        return this.usersService.find(email);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.usersService.remove(id);
    }

    @Patch(':id')
    update(@Body() attrs: UpdateUserDto, @Param('id') id: number){
        return this.usersService.update(id, attrs);
    }
}
