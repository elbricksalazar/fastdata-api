import { Injectable } from '@nestjs/common';
import { MsAgent } from '../../../_agent/ms.agent';
import { EnqueuedTask, Settings } from 'meilisearch';
import { IEventDrivenRequest } from '../../../event.driven.request/_domain/IEventDrivenRequest';
import { assign } from 'lodash';
import { EventDrivenRequestStoreService } from '../../../event.driven.request/services/edr.store.service';

@Injectable()
export class SettingsUpdateService {
  constructor(
    private readonly msAgent: MsAgent,
    private readonly eventDrivenRequestStoreService: EventDrivenRequestStoreService
  ) {}

  //
  async execute(indexName: string, settings: Settings): Promise<IEventDrivenRequest> {
    const result: EnqueuedTask = await (
      await this.msAgent.client.getIndex(indexName)
    ).updateSettings(settings);

    const newValue: IEventDrivenRequest = assign({}, result, { payload: {} });
    this.eventDrivenRequestStoreService.add(assign({}, result, { payload: {} }));
    return newValue;
  }
}
