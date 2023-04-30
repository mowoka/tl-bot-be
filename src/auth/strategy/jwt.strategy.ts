import { excludeUserField } from "@auth/utilities";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: { sub: string, nik: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                nik: payload.nik
            }, include: {
                sector: true,
                partner: true,
                witel: true,
                regional: true,
            },
        })

        if (!user) return null

        const userRemoveField = excludeUserField(user, ['password', 'createAt', 'updateAt', 'partner_id', 'sector_id', 'witel_id', 'regional_id'])

        return userRemoveField;
    }
}