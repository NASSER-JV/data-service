import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { NoticiasAnaliseService } from '@/services/noticias-analise.service';
import { CriarNoticiaAnaliseRequest } from '@/dtos/criar-noticia-analise.request';

@Controller('/noticiasanalise')
export class NoticiasAnaliseController {
  constructor(private readonly noticiasAnaliseService: NoticiasAnaliseService) {}

  @Get()
  async getAll() {
    return this.noticiasAnaliseService.list();
  }

  @Get('/filtrar')
  async getNews(@Query('ticker') ticker: string[]) {
    return this.noticiasAnaliseService.get(ticker);
  }

  @Post()
  async createNews(@Body() payload: CriarNoticiaAnaliseRequest) {
    return this.noticiasAnaliseService.create(payload);
  }

  @Post('/lote')
  async createManyNews(@Body() payload: CriarNoticiaAnaliseRequest[]) {
    return this.noticiasAnaliseService.createMany(payload);
  }

  @Delete()
  async deleteNews(@Query('url') url: string) {
    return this.noticiasAnaliseService.delete(url);
  }
}
