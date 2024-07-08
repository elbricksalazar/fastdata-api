import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';
import { Settings } from 'meilisearch';

@Injectable()
export class SettingsGetService {
  constructor(private readonly msAgent: MsAgent) {}

  //
  async execute(indexName: string): Promise<Settings> {
    //@ts-ignore
    return this.msAgent.client.httpRequest.get(`/indexes/${indexName}/settings`);
  }
}
