import { useFieldArray } from "react-hook-form";
import { Form, FormProps } from "../Form";
import slugify from 'slugify';
// import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { TextAreaFormInput } from "./inputs/TextAreaFormInput";
import { TextFormInput } from "./inputs/TextFormInput";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const FIELD_TYPE_OPTIONS = ['object', 'string', 'number', 'boolean', 'integer'];

export interface CreateSchemaFormFields {
  name: string;
  key: string;
  description: string;
  fields: {
    name: string;
    type: "object" | "string" | "number" | "boolean" | "integer";
    required: boolean;
  }[];
}

export interface CreateSchemaFormProps
  extends Omit<FormProps<CreateSchemaFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function CreateSchemaForm({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        Create
      </button>
    </div>
  ),
}: CreateSchemaFormProps) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "fields",
    }
  );
  const watchFields = form.watch(['name']);

  useEffect(() => {
    if (watchFields[0]) {
      form.setValue('key', slugify(watchFields[0], { lower: true, strict: true }));
    }
  }, [form, watchFields]);
  return (
    <Form form={form} onSubmit={onSubmit}>
      <h2 className="text-lg font-semibold mb-2">
        Action Info
      </h2>
      <TextFormInput name="name" label="Name" type="text" />
      <TextFormInput name="key" label="Key" type="text" />
      <TextAreaFormInput name="description" label="Description" />

      <h2 className="text-lg font-semibold mb-2">
        Fields
      </h2>
      {fields.map((field, index) => (
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-4 mb-2 border border-gray-200 rounded-md p-4">
            <div className="form-control w-full">
              <label className="label">Name</label>
              <input
                key={field.id}
                {...form.register(`fields.${index}.name`)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Type</label>
              <select {...form.register(`fields.${index}.type`)} className="select select-bordered">
                {FIELD_TYPE_OPTIONS.map(option => (
                  <option value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">Required?</label>
              <input type="checkbox" className="checkbox checkbox-primary mt-3 ml-3" {...form.register(`fields.${index}.required`)} />
            </div>
          </div>
          <div>
          <div className="flex items-center">
            <div className="tooltip tooltip-right" data-tip="Remove Field">
              <button type="button" className="btn btn-link text-red-500" onClick={() => remove(index)}>
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          </div>
        </div>
      ))}

      {fields.length === 0 && (
        <div className="border border-dashed rounded-lg text-center p-8">
            No Fields
        </div>
      )}

      <button
        type="button"
        className="btn btn-link no-underline"
        onClick={() => {
          append({
            name: "",
            required: false,
            type: "string",
          });
        }}
      >
        <PlusCircleIcon className="w-6 h-6" />
        Add Field
      </button>

      {footer}
    </Form>
  );
}
