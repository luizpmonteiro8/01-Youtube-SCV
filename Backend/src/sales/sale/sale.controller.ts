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
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleService } from './sale.service';

import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized - Usuário não autorizado.',
})
@ApiNotFoundResponse({
  description: 'NotFound - Registro não encontrado.',
})
@ApiTags('SCV')
@Controller('sale')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    private readonly authService: AuthService,
  ) {}

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
    return await this.saleService.paginate(
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
  @ApiOperation({ summary: 'Busca pelo id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.saleService.findById(BigInt(id));
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
  @UseGuards(JwtAuthGuard)
  async create(@Request() request, @Body() createSaleDTO: CreateSaleDto) {
    createSaleDTO.sellerId = await this.authService.getSellerIdFromJwt(request);
    return await this.saleService.create(createSaleDTO);
  }

  @ApiResponse({
    status: 201,
    description: 'Criado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit - Um registro com esse nome já existe.',
  })
  @ApiOperation({ summary: 'Atualiza cadastro' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
    @Request() request,
  ) {
    updateSaleDto.sellerId = await this.authService.getSellerIdFromJwt(request);
    return await this.saleService.update(BigInt(id), updateSaleDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Sucesso.',
  })
  @ApiOperation({ summary: 'Remove cadastro' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.saleService.remove(BigInt(id));
  }
}
