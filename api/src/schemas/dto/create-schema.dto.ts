export class CreateSchemaDto {
  projectId: string;
  name: string;
  key: string;
  description: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
}
