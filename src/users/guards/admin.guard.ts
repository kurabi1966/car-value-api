import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate {
    canActivate(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest();
        if(!request.session.userId) {
            return false;
        }
        return request.currentUser.admin;
    }
}