import {
  Controller,
  Get,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerService } from './seller.service';

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
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

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
    return await this.sellerService.paginate(
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
    return await this.sellerService.findById(BigInt(id));
  }

  /*   @ApiResponse({
    status: 201,
    description: 'Criado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit - Um registro com esse nome já existe.',
  })
  @ApiOperation({ summary: 'Cria cadastro' })
  @Post()
  async create(@Body() createSellerDTO: CreateSellerDto) {
    return await this.sellerService.create(createSellerDTO);
  } */

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
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return await this.sellerService.update(BigInt(id), updateSellerDto);
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
    return await this.sellerService.remove(BigInt(id));
  }
}
