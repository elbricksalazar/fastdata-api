import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';
import { IEventDrivenRequest } from '../../../event.driven.request/_domain/IEventDrivenRequest';
import { assign } from 'lodash';
import { EnqueuedTask } from 'meilisearch';
import { EventDrivenRequestStoreService } from '../../../event.driven.request/services/edr.store.service';

@Injectable()
export class IndexCreateService {
  constructor(
    private readonly msAgent: MsAgent,
    private readonly eventDrivenRequestStoreService: EventDrivenRequestStoreService
  ) {}

  //
  async execute(indexName: string, primaryKey: string): Promise<IEventDrivenRequest> {
    //

    //
    const result: EnqueuedTask = await this.msAgent.client.createIndex(indexName, {
      primaryKey,
    });

    //
    const newValue: IEventDrivenRequest = assign({}, result, { payload: {} });
    this.eventDrivenRequestStoreService.add(assign({}, result, { payload: {} }));
    return newValue;
  }
}
