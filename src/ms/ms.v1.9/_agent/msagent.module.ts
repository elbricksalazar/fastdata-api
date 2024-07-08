import { Module } from '@nestjs/common';
import { MsAgent } from './ms.agent';

@Module({
  imports: [],
  controllers: [],
  providers: [MsAgent],
  exports: [MsAgent],
})
export class MsAgentModule {}
