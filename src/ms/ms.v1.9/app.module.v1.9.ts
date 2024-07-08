import { Module } from '@nestjs/common';
import { EnvModule } from '../../config/env.module';
import { MsAgentModule } from './_agent/msagent.module';
import { EventDrivenRequestModule } from './event.driven.request/event.driven.request..module';
import { MsIndexModule } from './meilisearch/index.module';

@Module({
  imports: [EnvModule, MsAgentModule, EventDrivenRequestModule, MsIndexModule],
  controllers: [],
  providers: [],
})
export class AppModuleV19 {}
