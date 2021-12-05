import { Controller, Delete, Get, HttpException, HttpStatus, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasAnaliseService } from '@/services/noticias-analise.service';

@Controller('/noticiasanalise')
export class NoticiasAnaliseController {
  constructor(private readonly noticiasAnaliseService: NoticiasAnaliseService) {}

  @Get()
  async getAll() {
    return this.noticiasAnaliseService.list();
  }

  @Get('/filtrar')
  async getNews(@Query('ticker') ticker) {
    return this.noticiasAnaliseService.get(ticker);
  }

  @Post()
  async createNews(@Req() request: Request) {
    const body = request.body;
    return await this.noticiasAnaliseService.create(body);
  }

  @Post('/lote')
  async createManyNews(@Req() request: Request) {
    const body = request.body;
    return this.noticiasAnaliseService.createMany(body);
  }

  @Delete()
  async deleteNews(@Query('url') url: string) {
    const deletedNews = await this.noticiasAnaliseService.delete(url);
    if (deletedNews instanceof String) {
      return deletedNews;
    } else {
      throw new HttpException('Noticia não foi encontrada no banco de dados.', HttpStatus.BAD_REQUEST);
    }
  }
}
