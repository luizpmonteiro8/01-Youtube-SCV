import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginRepository } from 'src/login/repository/login.repository';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private loginRepository: LoginRepository) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.loginRepository.findUserByEmail(email);
    if (user) {
      return user;
    }
    throw new UnauthorizedException('Usuário não encontrado.');
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
}
