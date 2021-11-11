import { Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { EmpresasService } from '@/services/empresas.service';
import { Request } from 'express';

@Controller('/empresas')
export class EmpresasController {
  constructor(private readonly empresaService: EmpresasService) {}

  @Get()
  getAll() {
    return this.empresaService.list();
  }

  @Get('/filtrar')
  getCompany(@Query('name') name) {
    return this.empresaService.get(name);
  }

  @Post('/criar')
  createCompany(@Req() request: Request) {
    return this.empresaService.create(request);
  }

  @Delete('/deletar/:id')
  deleteCompany(@Param('id') id: string) {
    return this.empresaService.delete(id);
  }
}
