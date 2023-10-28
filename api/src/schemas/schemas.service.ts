import { Injectable } from '@nestjs/common';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';

@Injectable()
export class SchemasService {
  constructor(private prisma: PrismaService) {}

  create(createSchemaDto: CreateSchemaDto) {
    const { projectId, key, name, description, fields } = createSchemaDto;
    return this.prisma.projectActionSchema.create({
      data: {
        projectId,
        key,
        name,
        description,
        data: {
          fields,
        } as Prisma.JsonObject,
      },
    });
  }

  findAll({ projectId }: { projectId: string }, opts: PaginatorOptions) {
    return paginator({
      model: this.prisma.projectActionSchema,
      args: {
        where: {
          projectId,
        },
      },
      opts,
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} schema`;
  }
}
