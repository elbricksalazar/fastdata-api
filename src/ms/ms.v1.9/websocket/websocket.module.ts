import { Module } from '@nestjs/common';
import { WebSocketsGatewayService } from './websocket.gateway.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WebSocketsGatewayService],
  exports: [WebSocketsGatewayService],
})
export class WebSocketModule {}
