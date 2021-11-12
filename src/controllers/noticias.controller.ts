import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
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
  getCompany(@Query('url') url) {
    return this.noticiasService.get(url);
  }

  @Post('/criar')
  createCompany(@Req() request: Request) {
    const body = request.body;
    return this.noticiasService.create(body);
  }

  @Delete('/deletar/:url')
  deleteCompany(@Param('url') url: string) {
    return this.noticiasService.delete(url);
  }
}
