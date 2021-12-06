import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasService } from '@/services/noticias.service';
import { FilterQuery } from '@mikro-orm/core';
import { Noticias } from '@/data/entities/noticias.entity';
import { CriarNoticiaRequest } from '@/dtos/criar-noticia.request';

@Controller('/noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  getAll() {
    return this.noticiasService.list();
  }

  @Get('/filtrar')
  getNews(@Query('url') url: string) {
    return this.noticiasService.get(url);
  }

  @Post()
  async createNews(@Req() request: Request) {
    const body = request.body;
    return await this.noticiasService.create(body);
  }

  @Post('/lote')
  async createManyNews(@Body() payload: CriarNoticiaRequest[]) {
    return this.noticiasService.createMany(payload);
  }

  @Patch('/:url')
  async updateNews(@Body() payload: CriarNoticiaRequest, @Param() url: FilterQuery<Noticias>) {
    return this.noticiasService.update(url, payload);
  }

  @Delete()
  async deleteNews(@Query('url') url: string) {
    return await this.noticiasService.delete(url);
  }
}
