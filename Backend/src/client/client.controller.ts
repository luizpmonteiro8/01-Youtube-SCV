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
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('pages?')
  @UseGuards(JwtAuthGuard)
  async pagination(@Request() request) {
    return await this.clientService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return await this.clientService.findById(BigInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createClientDTO: CreateClientDto) {
    return await this.clientService.create(createClientDTO);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(BigInt(id), updateClientDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return await this.clientService.remove(BigInt(id));
  }
}