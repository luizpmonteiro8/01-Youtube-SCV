import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized - Usuário não autorizado.',
})
@ApiTags('SCV')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiQuery({ name: 'search', description: 'Busca', required: false })
  @ApiQuery({
    name: 'order',
    description: 'Crescente/decrescente - "asc ou desc"',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    description: 'Ordenador - "id ou name"',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    description: 'Tamanho do retorno - ex:25',
    required: false,
  })
  @ApiQuery({ name: 'page', description: 'Página', required: false })
  @ApiOperation({ summary: 'Paginação' })
  @Get('pages?')
  @UseGuards(JwtAuthGuard)
  async pagination(@Request() request) {
    return await this.userService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'NotFound - Registro não encontrado.',
  })
  @ApiOperation({ summary: 'Busca pelo id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.userService.findById(BigInt(id));
  }

  @ApiResponse({
    status: 201,
    description: 'Criado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit - Um registro com esse nome já existe.',
  })
  @ApiOperation({ summary: 'Cria cadastro' })
  @Post()
  async create(@Body() createUserDTO: CreateUserDto) {
    return await this.userService.create(createUserDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit - Um registro com esse nome já existe.',
  })
  @ApiNotFoundResponse({
    description: 'NotFound - Registro não encontrado.',
  })
  @ApiOperation({ summary: 'Atualiza cadastro' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(BigInt(id), updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'NotFound - Registro não encontrado.',
  })
  @ApiOperation({ summary: 'Remove cadastro' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(BigInt(id));
  }
}
