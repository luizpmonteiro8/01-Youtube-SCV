import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  //unity
  await prisma.unity.create({
    data: { name: 'unid' },
  });
  await prisma.unity.create({
    data: { name: 'm' },
  });
  await prisma.unity.create({
    data: { name: 'kg' },
  });
  //category
  await prisma.category.create({
    data: { name: 'Eletrônica' },
  });
  await prisma.category.create({
    data: { name: 'Eletrônicos' },
  });
  await prisma.category.create({
    data: { name: 'Informática' },
  });
  await prisma.category.create({
    data: { name: 'Televisores' },
  });
  await prisma.category.create({
    data: { name: 'Monitores' },
  });

  //product
  await prisma.product.create({
    data: {
      name: 'Monitor 21 polegadas',
      priceSale: 1258.89,
      unity: { connect: { name: 'unid' } },
      categories: {
        connect: [{ name: 'Informática' }, { name: 'Monitores' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'Monitor 32 polegadas',
      priceSale: 2500.89,
      unity: { connect: { name: 'unid' } },
      categories: {
        connect: [{ name: 'Informática' }, { name: 'Monitores' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'Televisão 46 polegadas',
      priceSale: 3000.0,
      unity: { connect: { name: 'unid' } },
      categories: {
        connect: [{ name: 'Eletrônicos' }, { name: 'Televisores' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'Solda de estannho - metro',
      priceSale: 2.0,
      unity: { connect: { name: 'm' } },
      categories: {
        connect: [{ name: 'Eletrônica' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'Parafuso de 5mm',
      priceSale: 3.5,
      unity: { connect: { name: 'kg' } },
      categories: {
        connect: [{ name: 'Eletrônica' }],
      },
    },
  });
  await prisma.product.create({
    data: {
      name: 'Notebook acer -i5 250gb 8gb',
      priceSale: 3600.58,
      unity: { connect: { name: 'unid' } },
      categories: {
        connect: [{ name: 'Informática' }],
      },
    },
  });

  //user
  await prisma.user.create({
    data: {
      email: 'teste@teste.com.br',
      password: bcrypt.hashSync('12345678', 10),
      enabled: true,
      seller: { create: { name: 'Pedro Roberto Juan Castro' } },
    },
  });

  //client
  await prisma.client.create({
    data: {
      name: 'Francisco José',
      cpf: '282.039.790-50',
      address: {
        create: {
          street: 'Rua a',
          number: '25a',
          zipCode: '60000-000',
          district: 'A',
          state: 'A',
          country: 'Brasil',
        },
      },
    },
  });

  //sale
  await prisma.sale.create({
    data: {
      toDelivery: false,
      delivered: true,
      client: { connect: { name: 'Francisco José' } },
      seller: { connect: { name: 'Pedro Roberto Juan Castro' } },
      saleItem: {
        create: [
          {
            quantity: 2,
            product: { connect: { name: 'Monitor 32 polegadas' } },
            price: 2500.89,
          },
        ],
      },
    },
  });
  await prisma.sale.create({
    data: {
      toDelivery: false,
      delivered: true,
      client: { connect: { name: 'Francisco José' } },
      seller: { connect: { name: 'Pedro Roberto Juan Castro' } },
      saleItem: {
        create: [
          {
            quantity: 1,
            product: { connect: { name: 'Monitor 32 polegadas' } },
            price: 2500.89,
          },
          {
            quantity: 0.5,
            product: { connect: { name: 'Parafuso de 5mm' } },
            price: 3.5,
          },
          {
            quantity: 1,
            product: { connect: { name: 'Notebook acer -i5 250gb 8gb' } },
            price: 3600.58,
          },
        ],
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
