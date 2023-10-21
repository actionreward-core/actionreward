import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface TextAreaFormInputProps {
  name: string;
  label: string;
}

export const TextAreaFormInput: FC<TextAreaFormInputProps> = ({ name, label }) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="textarea"
      render={({ props }) => <textarea {...props} />}
    />
  );
};
