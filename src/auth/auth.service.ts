import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto, ValidateNikDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

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
        statusCode: 201,
        message: 'nik already register',
        success: false,
      }
    }
    return {
      statusCode: 201,
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
          statusCode: 400,
          message: 'User already exist',
          status: false,
        };
      }

      const user = await this.prisma.user.create({
        data: {
          nik: dto.nik,
          name: dto.name,
          password: generateHash,
          role: dto.role,
          partner_id: dto.partner_id,
          sector_id: dto.sector_id,
          witel_id: dto.witel_id,
          regional_id: dto.regional_id,
        },
      });

      const generateToken = await this.signToken(user.id, user.nik);

      delete user.password;

      const responseData = {
        access_token: generateToken.access_token,
      };

      return {
        statusCode: 201,
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

  async signin(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          nik: dto.nik,
        },
      });

      if (!user) return {
        statusCode: 400,
        message: 'Credential Incorrect',
        status: false,
      }

      const passwordMatch = await argon.verify(user.password, dto.password);

      if (!passwordMatch) return {
        statusCode: 400,
        message: 'Credential Incorrect',
        status: false,
      }

      const generateToken = await this.signToken(user.id, user.nik);

      return {
        statusCode: 200,
        message: 'Login success',
        status: true,
        data: generateToken
      }

    } catch (e) {
      return {
        statusCode: 500,
        message: 'Internal Server Error',
        status: false,
        data: e
      }
    }

  }

  async signToken(userId: number, nik: string) {
    const payload = {
      sub: userId,
      nik,
    };

    const secret = this.config.get('JWT_SECRET');

    // maybe future can improve to implements expire token
    const token = await this.jwt.signAsync(payload, {
      // expiresIn: '120m',
      secret,
    });

    const data = {
      access_token: token,
    };

    return data;
  }
}
