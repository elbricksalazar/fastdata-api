import { MsTaskListTypes } from './MsTaskTypes';

export interface IEventDrivenRequest {
  uid?: number;
  taskUid: number;
  indexUid?: string;
  status: string; // TaskStatus
  type: MsTaskListTypes; // TaskTypes
  canceledBy?: number;
  details?: any;
  error?: any;
  duration?: string;
  enqueuedAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  payload?: any;
  websocketTopics?: string[];
}
