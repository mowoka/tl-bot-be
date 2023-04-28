import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()

export class AdminRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log({ roles });
        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const { role } = request.user;
            if (role == 'admin') return true;
        }
        return false;
    }
}