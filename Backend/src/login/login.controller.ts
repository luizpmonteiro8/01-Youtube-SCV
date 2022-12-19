import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized - Usuário não autorizado.',
})
@ApiTags('SCV')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflit - A senha deve conter 8 caracteres no mínimo. / O email está inválido.',
  })
  @ApiNotFoundResponse({
    description: 'NotFound - Usuário não encontrado.',
  })
  @HttpCode(200)
  @ApiOperation({ summary: 'Login do usuário' })
  @Post()
  async login(@Body() loginDTO: LoginDto) {
    return await this.loginService.login(loginDTO);
  }
}
