import { Injectable } from '@nestjs/common';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerRepository } from './repository/seller.repository';

@Injectable()
export class SellerService {
  constructor(private readonly repository: SellerRepository) {}

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

  /*   async create(createSellerDTO: CreateSellerDto) {
    return await this.repository.create(createSellerDTO);
  } */

  async update(id: bigint, updateSellerDTO: UpdateSellerDto) {
    return await this.repository.update(id, updateSellerDTO);
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
}
