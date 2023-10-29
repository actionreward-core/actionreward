import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { randomBytes } from 'crypto';
import { IssuerService } from 'src/issuer/issuer.service';
import { IdentifyDto } from './dto/identify.dto';

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
}
