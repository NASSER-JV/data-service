import { Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasAnaliseService } from '@/services/noticias-analise.service';
import { NoticiasAnalise } from '@/data/entities/noticias-analise.entity';

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

  @Post()
  createNews(@Req() request: Request) {
    const body = request.body;
    const noticia = this.noticiasAnaliseService.create(body);
    if (noticia instanceof NoticiasAnalise) {
      return noticia;
    } else {
      throw new HttpException('Noticia já cadastrada no banco de dados.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/lote')
  createManyNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasAnaliseService.createMany(body);
  }

  @Delete()
  deleteCompany(@Query('url') url: string) {
    return this.noticiasAnaliseService.delete(url);
  }
}
