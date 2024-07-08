import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SettingsGetService } from '../services/settings/settings.get.service';
import { Settings } from 'meilisearch';
import { SettingsUpdateService } from '../services/settings/settings.update.service';

@Controller('/ms/settings')
export class IndexSettingsController {
  //

  constructor(
    private readonly settingsGetService: SettingsGetService,
    private readonly settingsUpdateService: SettingsUpdateService
  ) {}

  //
  @Get('/:indexName')
  getSettingsService(@Param('indexName') indexName: string): Promise<Settings> {
    return this.settingsGetService.execute(indexName);
  }

  //
  @Post('/:indexName')
  addDataDocumentService(@Param('indexName') indexName: string, @Body() payload: Settings): any {
    return this.settingsUpdateService.execute(indexName, payload);
  }
}
