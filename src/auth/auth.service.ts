import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ValidateNikDto } from './dto/validateNik.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }


  async validateNik(dto: ValidateNikDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        nik: dto.nik
      }
    });

    if (user) {
      return {
        statusCode: 200,
        message: 'nik already register',
        success: false,
      }
    }
    return {
      statusCode: 200,
      message: 'nik not register',
      success: true
    }

  }

  async signup(dto: AuthDto) {
    const generateHash = await argon.hash(dto.password);

    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          nik: dto.nik,
        },
      });

      if (findUser) {
        return {
          statusCode: 406,
          message: 'User already exist',
          status: false,
        };
      }

      const user = await this.prisma.user.create({
        data: {
          nik: dto.nik,
          name: dto.name,
          idTelegram: dto.idTelegram,
          partner: dto.partner,
          sector: dto.sector,
          witel: dto.witel,
          regional: dto.regional,
          password: generateHash,
        },
      });

      const generateToken = await this.signToken(user.id, user.nik);

      delete user.password;

      const responseData = {
        access_token: generateToken.access_token,
      };

      return {
        statusCode: 200,
        message: 'Create user success',
        status: true,
        data: responseData
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Creadential Taken');
        }
      }
      throw error;
    }
  }

  async sign(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        nik: dto.nik,
      },
    });

    if (!user) throw new ForbiddenException('Credential Incorrect');

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Credential Incorrect');

    const generateToken = await this.signToken(user.id, user.nik);

    return {
      statusCode: 200,
      message: 'Create user success',
      status: true,
      data: generateToken
    }
  }

  async signToken(userId: string, nik: string) {
    const payload = {
      sub: userId,
      nik,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret,
    });

    const data = {
      access_token: token,
    };

    return data;
  }
}
