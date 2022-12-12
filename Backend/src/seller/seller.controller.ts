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
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.sellerService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.sellerService.findById(BigInt(id));
  }

  @Post()
  async create(@Body() createSellerDTO: CreateSellerDto) {
    return await this.sellerService.create(createSellerDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return await this.sellerService.update(BigInt(id), updateSellerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sellerService.remove(BigInt(id));
  }
}
