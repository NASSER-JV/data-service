import { Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasAnaliseService } from '@/services/noticias-analise.service';

@Controller('/noticiasanalise')
export class NoticiasAnaliseController {
  constructor(private readonly noticiasAnaliseService: NoticiasAnaliseService) {}

  @Get()
  getAll() {
    return this.noticiasAnaliseService.list();
  }

  @Get('/filtrar')
  getNews(@Query('ticker') ticker) {
    return this.noticiasAnaliseService.get(ticker);
  }

  @Post('/criar')
  createNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasAnaliseService.create(body);
  }

  @Post('/importar')
  createManyNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasAnaliseService.createMany(body);
  }

  @Delete('/deletar')
  deleteCompany(@Query('url') url: string) {
    return this.noticiasAnaliseService.delete(url);
  }
}
