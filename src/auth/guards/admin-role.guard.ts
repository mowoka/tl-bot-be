import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AdminRolesGuard implements CanActivate {
    constructor() { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (request?.user) {
            const { role } = request.user;
            if (role == 'admin') return true;
        }
        return false;
    }
}