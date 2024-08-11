import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((data: never, ctx: ExecutionContext) => {
    // return req?.session?.userId
    // usage: @CurrentUser() user: User
    // data could be a field name to be extracted (e.g. id, email)
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
    // const {session} = request;
    // const {userId} = session || {};
    // if(!userId) {return null}
    // return request
    // how to access the userService to find the user by id?
    // this is a function, not a class
    return "lina@kurabi.net"
})