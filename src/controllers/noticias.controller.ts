import { Controller, Delete, Get, Patch, Post, Query, Req } from '@nestjs/common';
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

  @Post()
  async createNews(@Req() request: Request) {
    const body = request.body;
    return await this.noticiasService.create(body);
  }

  @Post('/lote')
  async createManyNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasService.createMany(body);
  }

  @Patch('/:id')
  async updateNews(@Req() request: Request) {
    const body = request.body;
    const url = request.params.url;
    return this.noticiasService.update(url, body);
  }

  @Delete()
  async deleteNews(@Query('url') url: string) {
    return await this.noticiasService.delete(url);
  }
}
