import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';
import { Index, IndexesResults } from 'meilisearch';

@Injectable()
export class IndexFindAllService {
  constructor(private readonly msAgent: MsAgent) {}

  async execute(
    limit: number,
    offset: number
  ): Promise<IndexesResults<Index<Record<string, any>>[]>> {
    return this.msAgent.client.getIndexes({
      limit: limit || 20,
      offset: offset || 0,
    });
  }
}
