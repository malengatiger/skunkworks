import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const mm = '🍎🍎🍎🍎 PrismaService 🍎';

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  [x: string]: any;
  async onModuleInit() {
    console.log(`${mm} onModuleInit ...`);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    console.log(`${mm} enableShutdownHooks ...`);

    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
