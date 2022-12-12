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
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { UnityService } from './unity.service';

@Controller('unity')
export class UnityController {
  constructor(private readonly unityService: UnityService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.unityService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.unityService.findById(BigInt(id));
  }

  @Post()
  async create(@Body() createUnityDTO: CreateUnityDto) {
    return await this.unityService.create(createUnityDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnityDto: UpdateUnityDto,
  ) {
    return await this.unityService.update(BigInt(id), updateUnityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.unityService.remove(BigInt(id));
  }
}
