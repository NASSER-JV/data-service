import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { JuncoesService } from '@/services/juncoes.service';

@Controller('/juncoes')
export class JuncoesController {
  constructor(private readonly juncoesService: JuncoesService) {}

  @Get()
  getAll() {
    return this.juncoesService.list();
  }

  @Get('/filtrar')
  getNews(@Query('id') id) {
    return this.juncoesService.get(id);
  }

  @Post('/criar')
  createJuncao(@Req() request: Request) {
    const body = request.body;
    return this.juncoesService.create(body);
  }

  @Delete('/deletar/:id')
  deleteJuncao(@Param('id') id: string) {
    return this.juncoesService.delete(id);
  }
}
