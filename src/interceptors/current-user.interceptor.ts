import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private readonly usersService: UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();
        // request.currentUser = request.session.user || {};
        request.currentUser = request.session.user;
        // if(user) {
        //     // const user = await this.usersService.findOne(userId);
        //     request.currentUser = user;
        // } else {

        // }
        // console.log('3. current user interceptor: ',request.currentUser);
        return next.handle();

    }
}