import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/product/repository/product.repository';
import { SaleItemService } from '../saleItem/saleItem.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleRepository } from './repository/sale.repository';

@Injectable()
export class SaleService {
  constructor(
    private readonly repository: SaleRepository,
    private readonly productRep: ProductRepository,
  ) {}

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

  async create(createSaleDTO: CreateSaleDto) {
    const promise = createSaleDTO.saleItem.map(async (item) => {
      const product = await this.productRep.findById(BigInt(item.productId));
      item.price = Number(product.priceSale);
      return item;
    });

    return await Promise.all(promise).then(async (values) => {
      createSaleDTO.saleItem = values;
      return await this.repository.create(createSaleDTO);
    });
  }

  async update(id: bigint, updateSaleDTO: UpdateSaleDto) {
    const promise = updateSaleDTO.saleItem.map(async (item) => {
      const product = await this.productRep.findById(BigInt(item.productId));
      item.price = Number(product.priceSale);
      return item;
    });

    return await Promise.all(promise).then(async (values) => {
      updateSaleDTO.saleItem = values;
      return await this.repository.update(id, updateSaleDTO);
    });
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
}
