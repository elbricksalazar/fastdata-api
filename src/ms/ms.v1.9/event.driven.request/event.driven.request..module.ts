import { Module } from '@nestjs/common';
import { EDRController } from './controller/edr.controller';
import { WebHookProducerService } from './services/webhook.producer.service';
import { WebSocketModule } from '../websocket/websocket.module';
import { MsAgentModule } from '../_agent/msagent.module';
import { EnvModule } from '../../../config/env.module';
import { EventDrivenRequestStoreService } from './services/edr.store.service';
import { KafkaProducerService } from './services/kafka.producer.service';
import { KafkaConsumerService } from './services/kafka.consumer.service';

@Module({
  imports: [EnvModule, MsAgentModule, WebSocketModule],
  controllers: [EDRController],
  providers: [
    EventDrivenRequestStoreService,
    WebHookProducerService,
    KafkaConsumerService,
    KafkaProducerService,
  ],
  exports: [EventDrivenRequestStoreService],
})
export class EventDrivenRequestModule {}
