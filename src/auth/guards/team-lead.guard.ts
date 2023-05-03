import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class TeamLeadRolesGuard implements CanActivate {
    constructor() { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request?.user) {
            const { role } = request.user;
            if (role == 'team-lead') return true;
        }
        return false;
    }
}