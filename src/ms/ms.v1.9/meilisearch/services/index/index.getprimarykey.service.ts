import { Injectable } from '@nestjs/common';
import { IndexFindByNameService } from './index.findbyname.service';

@Injectable()
export class IndexGetPrimaryKeyService {
  constructor(private readonly indexFindByNameService: IndexFindByNameService) {}

  //
  async execute(indexName: string): Promise<string> {
    const { primaryKey }: { primaryKey: string } =
      await this.indexFindByNameService.execute(indexName);
    return primaryKey;
  }
}
