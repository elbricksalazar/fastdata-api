import { Types } from 'mongoose';
import { IEventDrivenRequest } from './IEventDrivenRequest';
import { MsTaskListTypes } from './MsTaskTypes';

export class EventDrivenRequest implements IEventDrivenRequest {
  constructor(payload?: IEventDrivenRequest) {
    if (payload) {
      for (const key of Object.keys(payload)) {
        if (payload[key] !== undefined) this[key] = payload[key];
      }
    }
  }
  _id?: Types.ObjectId;
  taskUid: number;
  indexUid?: string;
  status: string;
  type: MsTaskListTypes;
  enqueuedAt: Date;
  canceledBy?: number;
  details?: any;
  error?: any;
  duration?: string;
  startedAt?: Date;
  finishedAt?: Date;
  payload?: any;
}
