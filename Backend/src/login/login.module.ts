import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRepository } from './repository/login.repository';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LoginController],
  providers: [PrismaService, LoginService, LoginRepository, AuthService],
})
export class LoginModule {}
