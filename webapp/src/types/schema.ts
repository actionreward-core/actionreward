export interface Schema {
  id: string;
  projectId: string;
  name: string;
  key: string;
  description: string;
  data: {
    name?: string;
    description?: string;
    fields?: {
      name: string;
      type: "object" | "string" | "number" | "boolean" | "integer";
      required: boolean;
    }[];
  }
  schemaTypeName?: string;
  schemaUrl?: string;
}