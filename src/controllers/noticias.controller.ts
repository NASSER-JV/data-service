import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { NoticiasServices } from '@/services/noticias.services';

@Controller('/noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasServices) {}

  @Get()
  getAll() {
    return this.noticiasService.list();
  }

  // @Get()
  // getCompany(@Query('name') name) {
  //   return this.noticiasService.get(name);
  // }

  @Post('/criar')
  createCompany(@Req() request: Request) {
    const body = request.body;
    return this.noticiasService.create(body);
  }

  @Delete('/deletar/:id')
  deleteCompany(@Param('id') id: string) {
    return this.noticiasService.delete(id);
  }
}
