import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const { results, totalItems } = await this.repository.paginate(
      page,
      size,
      sort,
      order,
      search,
    );
    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }

  async findById(id: bigint) {
    return await this.repository.findById(id);
  }

  async create(createUserDTO: CreateUserDto) {
    createUserDTO.password = bcrypt.hashSync(createUserDTO.password, 10);
    return await this.repository.create(createUserDTO);
  }

  async update(id: bigint, updateUserDTO: UpdateUserDto) {
    updateUserDTO.password = bcrypt.hashSync(updateUserDTO.password, 10);
    return await this.repository.update(id, updateUserDTO);
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
}
