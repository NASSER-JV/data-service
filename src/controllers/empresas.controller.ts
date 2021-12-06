import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EmpresasService } from '@/services/empresas.service';
import { CriarEmpresaRequest } from '@/dtos/criar-empresa.request';

@Controller('/empresas')
export class EmpresasController {
  constructor(private readonly empresaService: EmpresasService) {}

  @Get()
  getAll() {
    return this.empresaService.list();
  }

  @Get('/filtrar')
  getCompany(@Query() sigla: string, @Query() ativo: boolean) {
    return this.empresaService.get(sigla, ativo);
  }

  @Post()
  createCompany(@Body() empresa: CriarEmpresaRequest) {
    return this.empresaService.create(empresa);
  }

  @Patch('/:id')
  updateCompany(@Body() empresa: CriarEmpresaRequest, @Param() id: number) {
    return this.empresaService.update(id, empresa);
  }

  @Delete('/deletar/:id')
  deleteCompany(@Param('id') id: number) {
    return this.empresaService.delete(id);
  }
}
