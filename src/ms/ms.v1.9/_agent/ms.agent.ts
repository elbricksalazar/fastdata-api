import { Injectable, OnModuleInit } from '@nestjs/common';
import MeiliSearch from 'meilisearch';

@Injectable()
export class MsAgent implements OnModuleInit {
  public client: MeiliSearch;
  onModuleInit() {
    this.client = new MeiliSearch({
      host: process.env.MEILI_HOST,
      apiKey: process.env.MEILI_API_KEY,
    });
  }
}
