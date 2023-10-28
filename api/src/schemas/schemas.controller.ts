import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SchemasService } from './schemas.service';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { ProjectId } from 'src/common/decorators/project-id.decorator';
import { ProjectOwnership } from 'src/common/guards/project-ownership.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('schemas')
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Post()
  create(
    @Body() createSchemaDto: CreateSchemaDto,
    @ProjectId() projectId: string | null,
  ) {
    return this.schemasService.create({
      ...createSchemaDto,
      projectId,
    });
  }

  @UseGuards(JwtAuthGuard, ProjectOwnership)
  @Get()
  findAll(@ProjectId() projectId: string | null) {
    return this.schemasService.findAll({ projectId }, { page: 1, perPage: 50 });
  }
}
