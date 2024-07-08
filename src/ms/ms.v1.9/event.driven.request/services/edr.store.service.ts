import { Injectable } from '@nestjs/common';
import { IEventDrivenRequest } from '../_domain/IEventDrivenRequest';

@Injectable()
export class EventDrivenRequestStoreService {
  private readonly store: Record<number, any> = {};

  add(eventDrivenRequest: IEventDrivenRequest): void {
    this.store[eventDrivenRequest.taskUid] = eventDrivenRequest;
  }

  getAndRemove(taskUid: IEventDrivenRequest['taskUid']): IEventDrivenRequest {
    const r = this.store[taskUid];
    delete this.store[taskUid];
    return r;
  }
}
