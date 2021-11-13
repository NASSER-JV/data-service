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
  getCompany(@Query() params) {
    const sigla = params.sigla;
    const ativo = params.ativo;
    return this.empresaService.get(sigla, ativo);
  }

  @Post('/criar')
  createCompany(@Req() request: Request) {
    const body = request.body;
    return this.empresaService.create(body);
  }

  @Delete('/deletar/:id')
  deleteCompany(@Param('id') id: string) {
    return this.empresaService.delete(id);
  }
}
