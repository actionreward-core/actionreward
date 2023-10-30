import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { randomBytes } from 'crypto';
import { IssuerService } from 'src/issuer/issuer.service';
import { IdentifyDto } from './dto/identify.dto';
import { SendActionDto } from './dto/send-action.dto';
import { NotFoundError } from 'rxjs';
import { SchemaData } from 'src/schemas/schemas.types';
import { JsonObject } from '@prisma/client/runtime/library';
import { type } from 'os';

const generateProjectToken = () => randomBytes(32).toString('hex');

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private issuerService: IssuerService,
  ) {}

  async create(ownerId: string, createProjectDto: CreateProjectDto) {
    const { name } = createProjectDto;
    const accessToken = generateProjectToken();
    const { identifier } = await this.issuerService.createIdentity();
    return this.prismaService.project.create({
      data: {
        name,
        ownerId,
        accessToken,
        issuerIdentifier: identifier,
      },
    });
  }

  findAll(ownerId: string, filter = {}, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.project,
      args: {
        where: {
          ...filter,
          ownerId,
        },
        orderBy: {
          name: 'asc',
        },
      },
      opts: opts,
    });
  }

  findOne(ownerId: string, id: string) {
    return this.prismaService.project.findUnique({
      where: {
        ownerId,
        id,
      },
    });
  }

  findOneByProjectToken(accessToken: string) {
    return this.prismaService.project.findUnique({
      where: {
        accessToken,
      },
    });
  }

  update(ownerId: string, id: string, updateProjectDto: UpdateProjectDto) {
    return this.prismaService.project.update({
      where: {
        ownerId,
        id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  remove(ownerId: string, id: string) {
    return this.prismaService.project.delete({
      where: {
        ownerId,
        id,
      },
    });
  }

  identify(id: string, identifyDto: IdentifyDto) {
    const { userId, did } = identifyDto;
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    if (!did) {
      throw new BadRequestException('did is required');
    }
    return this.prismaService.projectUser.upsert({
      create: {
        projectId: id,
        userId,
        did,
      },
      update: {
        did,
      },
      where: {
        projectId_userId: {
          projectId: id,
          userId,
        },
      },
    });
  }

  async sendAction(id: string, sendActionDto: SendActionDto) {
    const { userId, actionKey, properties } = sendActionDto;
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    if (!properties) {
      throw new BadRequestException('properties is required');
    }
    // Validate field types
    const schema = await this.prismaService.projectActionSchema.findUnique({
      where: {
        projectId_key: {
          projectId: id,
          key: actionKey,
        },
      },
    });
    if (!schema) {
      throw new NotFoundException('Could not find action by the provided key');
    }
    const schemaData = schema.data as unknown as SchemaData;
    const claimValues: any = {};
    schemaData.fields.forEach((field) => {
      const value = properties[field.name];
      if (field.required && !value) {
        throw new BadRequestException(`Field '${field.name}' is required`);
      }
      switch (field.type) {
        case 'string':
          if (typeof value !== 'string') {
            throw new BadRequestException(
              `Field '${field.name}' should be string`,
            );
          }
          break;
        case 'boolean':
          if (typeof value !== 'boolean') {
            throw new BadRequestException(
              `Field '${field.name}' should be boolean`,
            );
          }
          break;
        case 'number':
          const isNumber = typeof value === 'number';
          if (!isNumber) {
            throw new BadRequestException(
              `Field '${field.name}' should be a number`,
            );
          }
          break;
        case 'integer':
          const isInt = typeof value === 'number' && Number.isInteger(value);
          if (!isInt) {
            throw new BadRequestException(
              `Field '${field.name}' should be integer`,
            );
          }
          break;
      }
      claimValues[field.name] = value;
    });
    console.log(claimValues);
  }
}
