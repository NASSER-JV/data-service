import { Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasService } from '@/services/noticias.service';

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

  @Post('/criar')
  createNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasService.create(body);
  }

  @Post('/importar')
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

  @Delete('/deletar/:url')
  deleteCompany(@Param('url') url: string) {
    return this.noticiasService.delete(url);
  }
}
