import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginRepository } from './repository/login.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly repository: LoginRepository,
    private readonly authService: AuthService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.repository.findUserByEmail(loginDto.email);
    const result = bcrypt.compareSync(loginDto.password, user.password);
    if (result) {
      const accessToken = await this.authService.login(user);
      return { accessToken };
    } else {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }
}
