import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';

@Injectable()
export class IndexDeleteService {
  constructor(private readonly msAgent: MsAgent) {}

  //
  async execute(indexName: string): Promise<boolean> {
    //
    const result = await this.msAgent.client.deleteIndexIfExists(indexName);
    return result;
  }
}
