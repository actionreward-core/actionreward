import React, { FC } from "react";
import { Form, FormProps } from "../Form";
import { TextFormInput } from "./inputs/TextFormInput";

export interface SetContractFormProps
  extends Omit<FormProps<{ address: string }>, "children"> {
  footer?: React.ReactNode;
}

export const SetContractForm: FC<SetContractFormProps> = ({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        Start
      </button>
    </div>
  ),
}) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextFormInput name="address" label="Contract Address" />
      {footer}
    </Form>
  );
};
