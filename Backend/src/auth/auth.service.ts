import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginRepository } from 'src/login/repository/login.repository';
import { sign, verify } from 'jsonwebtoken';

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
    const payload = { email: user.email, userId: user.id };

    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  private jwtExtractor(headers) {
    const tokenBearer: string = headers.authorization;

    const [, token] = tokenBearer.split(' ');
    return token;
  }

  async getSellerIdFromJwt(req) {
    const token = this.jwtExtractor(req.headers);
    const claims = verify(token, process.env.JWT_SECRET);

    const sellerId = await this.loginRepository.findSellerIdByUserId(
      claims['userId'],
    );

    return sellerId;
  }
}
