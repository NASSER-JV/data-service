import { Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasService } from '@/services/noticias.service';
import { Noticias } from '@/data/entities/noticias.entity';

@Controller('/noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  getAll() {
    return this.noticiasService.list();
  }

  @Get('/filtrar')
  getNews(@Query('url') url) {
    return this.noticiasService.get(url);
  }

  @Post()
  createNews(@Req() request: Request) {
    const body = request.body;
    const noticia = this.noticiasService.create(body);
    if (noticia instanceof Noticias) {
      return noticia;
    } else {
      throw new HttpException('Noticia já cadastrada no banco de dados.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/lote')
  createManyNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasService.createMany(body);
  }

  @Patch('/:id')
  updateNews(@Req() request: Request) {
    const body = request.body;
    const url = request.params.url;
    return this.noticiasService.update(url, body);
  }

  @Delete()
  deleteCompany(@Query('url') url: string) {
    const deletedNews = this.noticiasService.delete(url);
    if (deletedNews instanceof String) {
      return deletedNews;
    } else {
      throw new HttpException('Noticia não foi encontrada no banco de dados.', HttpStatus.BAD_REQUEST);
    }
  }
}
