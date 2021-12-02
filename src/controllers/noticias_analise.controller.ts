import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasAnaliseService } from '@/services/noticias_analise.service';

@Controller('/noticiasanalise')
export class Noticias_analiseController {
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

  @Delete('/deletar/:url')
  deleteCompany(@Param('url') url:string) {
    return this.noticiasAnaliseService.delete(url);
  }
}
