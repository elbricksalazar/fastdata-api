import { Injectable } from '@nestjs/common';
import { EnqueuedTask } from 'meilisearch';
import { MsAgent } from '../../../_agent/ms.agent';
import { IEventDrivenRequest } from '../../../event.driven.request/_domain/IEventDrivenRequest';
import { assign } from 'lodash';
import { EventDrivenRequestStoreService } from '../../../event.driven.request/services/edr.store.service';

@Injectable()
export class DocumentAddUpdateService {
  constructor(
    private readonly msAgent: MsAgent,
    private readonly eventDrivenRequestStoreService: EventDrivenRequestStoreService
  ) {}

  async execute(indexName: string, payload: any): Promise<IEventDrivenRequest> {
    //
    const payloadData = payload.data.map((item: any) =>
      assign({}, item, { websocketTopics: payload.websocketTopics })
    );

    //

    const result: EnqueuedTask = await this.msAgent.client
      .index(indexName)
      .addDocuments(payloadData);

    //
    const newValue: IEventDrivenRequest = assign({}, result);
    newValue['payloadData'] = payloadData;
    this.eventDrivenRequestStoreService.add(newValue);
    return newValue;
  }
}
