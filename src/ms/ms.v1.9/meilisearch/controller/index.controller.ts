import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Index, IndexesResults } from 'meilisearch';
import { IndexCreateService } from '../services/index/index.create.service';
import { IndexFindByNameService } from '../services/index/index.findbyname.service';
import { IndexUpdateService } from '../services/index/index.update.service';
import { DocumentAddUpdateService } from '../services/document/document.addupdate.service';
import { IndexDeleteService } from '../services/index/index.delete.service';
import { IndexFindAllService } from '../services/index/index.findall.service';
import { IEventDrivenRequest } from '../../event.driven.request/_domain/IEventDrivenRequest';

@Controller('/ms/index')
export class IndexController {
  //

  constructor(
    private readonly indexCreateService: IndexCreateService,
    private readonly indexFindByNameService: IndexFindByNameService,
    private readonly indexFindAllService: IndexFindAllService,
    private readonly indexUpdateService: IndexUpdateService,
    private readonly indexDeleteService: IndexDeleteService,

    //
    private readonly documentAddUpdateService: DocumentAddUpdateService
  ) {}

  //
  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number
  ): Promise<IndexesResults<Index<Record<string, any>>[]>> {
    return this.indexFindAllService.execute(limit, offset);
  }

  //
  @Get('/:indexName')
  findByNameService(@Param('indexName') indexName: string): Promise<Index<Record<string, any>>> {
    return this.indexFindByNameService.execute(indexName);
  }

  //
  @Post('/document/:indexName')
  addDataDocumentService(@Param('indexName') indexName: string, @Body() payload: any): any {
    return this.documentAddUpdateService.execute(indexName, payload);
  }

  //
  @Post('/:indexName/:primaryKey')
  createService(
    @Param('indexName') indexName: string,
    @Param('primaryKey') primaryKey: string
  ): Promise<IEventDrivenRequest> {
    return this.indexCreateService.execute(indexName, primaryKey);
  }

  //
  @Put('/:indexName/:primaryKey')
  updateService(
    @Param('indexName') indexName: string,
    @Param('primaryKey') primaryKey: string
  ): Promise<IEventDrivenRequest> {
    return this.indexUpdateService.execute(indexName, primaryKey);
  }

  //
  @Delete('/:indexName')
  indexDelete(@Param('indexName') indexName: string): Promise<boolean> {
    return this.indexDeleteService.execute(indexName);
  }
}
