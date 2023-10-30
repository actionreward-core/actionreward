import { Injectable } from '@nestjs/common';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { Storage } from '@google-cloud/storage';
import { pascalCase, headerCase } from 'change-case-all';
import * as fs from 'fs';

const schemaTemplate = JSON.parse(
  fs.readFileSync('./templates/schema.json', 'utf8'),
);

@Injectable()
export class SchemasService {
  storage: Storage;

  constructor(private prisma: PrismaService) {
    this.storage = new Storage({
      keyFilename: './gcloud-key.json',
    });
  }

  private async uploadPublicSchemaFile(path: string, content: string) {
    return this.storage.bucket('actionreward').file(path).save(content, {
      predefinedAcl: 'publicRead',
    });
  }

  private async uploadSchemaFiles(
    actionSchemaId: string,
    data: CreateSchemaDto,
  ) {
    const name = pascalCase(data.name);
    const filename = headerCase(data.name).toLowerCase();
    const path = `schemas/${actionSchemaId}`;
    const baseUrl = `${process.env.CDN_BASE_URL}/${path}`;
    const description = data.description;

    // Uploading Vocab
    await this.uploadPublicSchemaFile(
      `${path}/${filename}-vocab.md`,
      `# ${name}\n\n${description}`,
    );

    // Uploading JSON LD
    const fieldProps = {};
    data.fields.forEach((field) => {
      fieldProps[field.name] = {
        '@id': `vocab:${field.name}`,
        '@type': `xsd:${field.type}`,
      };
    });
    const jsonldData = {
      '@context': [
        {
          '@version': 1.1,
          '@protected': true,
          id: '@id',
          type: '@type',
          [name]: {
            '@id': `${baseUrl}/${filename}.jsonld#${name}`,
            '@context': {
              '@version': 1.1,
              '@protected': true,
              id: '@id',
              type: '@type',
              vocab: `${baseUrl}/${filename}-vocab.md#${name}`,
              xsd: 'http://www.w3.org/2001/XMLSchema#',
              ...fieldProps,
            },
          },
        },
      ],
    };
    await this.uploadPublicSchemaFile(
      `${path}/${filename}.jsonld`,
      JSON.stringify(jsonldData, null, 4),
    );

    // Uploading Schema
    const schemaData = { ...schemaTemplate };
    const schemaUrl = `${baseUrl}/${filename}.json`;
    schemaData.$metadata.uris.jsonSchema = schemaUrl;
    schemaData.$metadata.uris.jsonLdContext = `${baseUrl}/${filename}.jsonld`;
    data.fields.forEach((field) => {
      const { credentialSubject } = schemaData.properties;
      if (field.required) {
        credentialSubject.required.push(field.name);
      }
      credentialSubject.properties[field.name] = {
        title: field.name, // TODO: Add a description option for field
        type: field.type,
      };
    });
    await this.uploadPublicSchemaFile(
      `${path}/${filename}.json`,
      JSON.stringify(schemaData, null, 4),
    );

    return {
      name,
      schemaUrl,
    };
  }

  async create(createSchemaDto: CreateSchemaDto) {
    const { projectId, key, name, description, fields } = createSchemaDto;

    const actionSchema = await this.prisma.projectActionSchema.create({
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

    const { name: schemaTypeName, schemaUrl } = await this.uploadSchemaFiles(
      actionSchema.id,
      createSchemaDto,
    );

    return this.prisma.projectActionSchema.update({
      where: {
        id: actionSchema.id,
      },
      data: {
        schemaTypeName,
        schemaUrl,
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
