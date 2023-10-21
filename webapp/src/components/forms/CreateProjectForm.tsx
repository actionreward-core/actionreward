import { Form, FormProps } from "../Form";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { TextFormInput } from "./inputs/TextFormInput";

export interface CreateProjectFormFields {
  name: string;
  logo: string;
}

export interface CreateProjectFormProps
  extends Omit<FormProps<CreateProjectFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function CreateProjectForm({
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
}: CreateProjectFormProps) {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <ImageUploaderFormInput name="logo" label="Logo" previewHeight={80} previewWidth={80} />
      <TextFormInput name="name" label="Name" type="text" />
      {footer}
    </Form>
  );
}
