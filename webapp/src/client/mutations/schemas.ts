import { Schema } from "../../types/schema";
import { api } from "../api";

export interface CreateSchemaInput {
  name: string;
  description: string;
  fields: {
    name: string;
    type: "object" | "string" | "number" | "boolean" | "integer";
    required: boolean;
  }[];
}

export const createSchema = async (input: CreateSchemaInput) => {
  const { data } = await api.post<Schema>('/schemas', input);
  return data;
}