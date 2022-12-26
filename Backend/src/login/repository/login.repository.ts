import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: { email, enabled: true },
    });
  }

  async findSellerIdByUserId(userId: string) {
    const resp = await this.prisma.user.findFirstOrThrow({
      where: { id: BigInt(userId), enabled: true },
      include: { seller: true },
    });
    return resp.seller.id;
  }
}
