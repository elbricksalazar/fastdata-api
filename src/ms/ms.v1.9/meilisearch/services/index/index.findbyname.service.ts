import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';
import { Index } from 'meilisearch';

@Injectable()
export class IndexFindByNameService {
  constructor(private readonly msAgent: MsAgent) {}
  async execute(indexName: string): Promise<Index<Record<string, any>>> {
    return this.msAgent.client.getIndex(indexName);
  }
}
