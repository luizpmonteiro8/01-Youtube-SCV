import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.saleService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.saleService.findById(BigInt(id));
  }

  @Post()
  async create(@Body() createSaleDTO: CreateSaleDto) {
    createSaleDTO.sellerId = 1;
    return await this.saleService.create(createSaleDTO);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    updateSaleDto.sellerId = 1;
    return await this.saleService.update(BigInt(id), updateSaleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.saleService.remove(BigInt(id));
  }
}
