/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";
import {
  Web3StorageImageUploader,
  Web3StorageImageUploaderProps,
} from "../../Web3StorageImageUploader";

export interface ImageUploaderFormInputProps
  extends Omit<Web3StorageImageUploaderProps, "onChange" | "value"> {
  name: string;
  label: string;
}

export const ImageUploaderFormInput: FC<ImageUploaderFormInputProps> = ({
  name,
  label,
  ...props
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="textarea"
      render={() => (
        <Controller
          control={form.control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <Web3StorageImageUploader
              {...props}
              onChange={(v) => {
                onChange({ target: { value: v } });
                onBlur();
              }}
              value={value}
            />
          )}
        />
      )}
    />
  );
};
