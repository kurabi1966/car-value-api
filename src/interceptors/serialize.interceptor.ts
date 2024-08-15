import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import {plainToInstance } from "class-transformer";

// TODO: make the interceptor special only for use entity [not a generic for all entities]
// ClassConstructor is a type that represents a class constructor function.
// The advantage of using this type is that we can use it with generics.
interface ClassConstructor {
    new (...args: any[]): {}
}
export function SerializeUser(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export function SerializeReport(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}