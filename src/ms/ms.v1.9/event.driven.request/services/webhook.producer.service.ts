import { Injectable } from '@nestjs/common';
import { IEventDrivenRequest } from '../_domain/IEventDrivenRequest';
import { EventDrivenRequestStoreService } from './edr.store.service';
import { assign } from 'lodash';
import { KafkaProducerService } from './kafka.producer.service';

@Injectable()
export class WebHookProducerService {
  constructor(
    private readonly eventDrivenRequestStoreService: EventDrivenRequestStoreService,
    private readonly kafkaProducerService: KafkaProducerService
  ) {}

  async execute(IEventDrivenRequest: IEventDrivenRequest): Promise<any> {
    const dataStored = this.eventDrivenRequestStoreService.getAndRemove(
      IEventDrivenRequest.taskUid
    );
    const newValue = assign({}, IEventDrivenRequest, { payload: dataStored });
    await this.kafkaProducerService.send({
      topic: IEventDrivenRequest?.type,
      messages: [
        {
          value: JSON.stringify(newValue),
        },
      ],
    });
  }
}
