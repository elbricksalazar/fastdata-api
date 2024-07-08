import { Module } from '@nestjs/common';
import { IndexController } from './controller/index.controller';
import { IndexCreateService } from './services/index/index.create.service';
import { DocumentAddUpdateService } from './services/document/document.addupdate.service';
import { IndexFindByNameService } from './services/index/index.findbyname.service';
import { IndexUpdateService } from './services/index/index.update.service';
import { IndexDeleteService } from './services/index/index.delete.service';
import { IndexFindAllService } from './services/index/index.findall.service';
import { EventDrivenRequestModule } from '../event.driven.request/event.driven.request..module';
import { EnvModule } from '../../../config/env.module';
import { MsAgentModule } from '../_agent/msagent.module';
import { IndexGetPrimaryKeyService } from './services/index/index.getprimarykey.service';
import { SettingsGetService } from './services/settings/settings.get.service';
import { IndexSettingsController } from './controller/index.settings.controller';
import { SettingsUpdateService } from './services/settings/settings.update.service';

@Module({
  imports: [EnvModule, MsAgentModule, EventDrivenRequestModule],
  controllers: [IndexController, IndexSettingsController],
  providers: [
    IndexFindAllService,
    IndexFindByNameService,
    IndexCreateService,
    IndexUpdateService,
    IndexDeleteService,
    IndexGetPrimaryKeyService,

    //
    SettingsGetService,
    SettingsUpdateService,

    //
    DocumentAddUpdateService,
  ],
})
export class MsIndexModule {}
