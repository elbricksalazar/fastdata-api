import { Body, Controller, Post } from '@nestjs/common';
import { WebHookProducerService } from '../services/webhook.producer.service';
import { IEventDrivenRequest } from '../_domain/IEventDrivenRequest';

@Controller('/ms/task')
export class EDRController {
  //

  constructor(private readonly webHookProducerService: WebHookProducerService) {}

  /**
   *
   * @param payload
   * @returns
   */
  @Post()
  createServiceFromWebHook(@Body() payload: any): Promise<IEventDrivenRequest> {
    if (Object.keys(payload).length > 0) {
      payload['taskUid'] = payload.uid;
      return this.webHookProducerService.execute(payload);
    }
    return null;
  }
}
