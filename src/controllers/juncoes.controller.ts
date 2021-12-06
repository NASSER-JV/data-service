import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { JuncoesService } from '@/services/juncoes.service';
import { CriarJuncaoRequest } from '@/dtos/criar-juncao.request';

@Controller('/juncoes')
export class JuncoesController {
  constructor(private readonly juncoesService: JuncoesService) {}

  @Get()
  getAll() {
    return this.juncoesService.list();
  }

  @Get('/filtrar')
  getJuncao(@Query('id') id: number) {
    return this.juncoesService.get(id);
  }

  @Post()
  createJuncao(@Req() request: Request) {
    const body = request.body;
    return this.juncoesService.create(body);
  }

  @Patch('/:id')
  updateJuncao(@Body() juncao: CriarJuncaoRequest, @Param() id: number) {
    return this.juncoesService.update(id, juncao);
  }

  @Delete('/deletar/:id')
  deleteJuncao(@Param('id') id: number) {
    return this.juncoesService.delete(id);
  }
}
