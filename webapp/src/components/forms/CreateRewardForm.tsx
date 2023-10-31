import { CodeBracketIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Form, FormProps } from "../Form";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { TextFormInput } from "./inputs/TextFormInput";
import { CouponsInput } from "../CouponsInput";
import { useEffect, useState } from "react";
import { SelectFormInput } from "./inputs/SelectFormInput";
import { useQuery } from "@tanstack/react-query";
import { getSchemas } from "../../client/queries/schemas";

const OPERATORS = [
  {
    label: 'Equal to',
    value: '$eq',
  },
  {
    label: 'Not equal to',
    value: '$ne',
  },
  {
    label: 'Less than',
    value: '$lt',
  },
  {
    label: 'Greater than',
    value: '$gt',
  },
  {
    label: 'Matches one of the values',
    value: '$in',
  },
  {
    label: 'Matches none of the values',
    value: '$nin',
  },
]

export interface CreateRewardFormFields {
  projectId: string;
  schemaId: string;
  name: string;
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
  coupons: string[];
}

export interface CreateRewardFormProps
  extends Omit<FormProps<CreateRewardFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function CreateRewardForm({
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
}: CreateRewardFormProps) {
  const [coupons, setCoupons] = useState<string[]>([]);
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);
  const { data: schemas } = useQuery({
    queryKey: ['getSchemas'],
    queryFn: getSchemas,
  });
  const watchFields = form.watch(['schemaId']);

  useEffect(() => {
    const schemaId = watchFields[0];
    if (schemaId) {
      const schema = schemas?.data.find(s => s.id === schemaId);
      const fieldOptions = (schema?.data.fields || []).map(f => f.name);
      setFieldOptions(fieldOptions);
      form.setValue('conditionField', fieldOptions[0]);
    }
  }, [schemas?.data, watchFields]);
  useEffect(() => {
    if (coupons) {
      console.log(coupons);
      form.setValue('coupons', coupons);
    }
  }, [coupons]);
  return (
    <Form form={form} onSubmit={onSubmit}>
      <ImageUploaderFormInput
        name="logo"
        label="Logo"
        previewHeight={80}
        previewWidth={80}
      />
      <TextFormInput name="name" label="Name" type="text" />

      <label className="label text-sm">
        Reward Type
      </label>
      <ul className="border w-full rounded-box text-gray-500">
        <li className="p-2 border-b">
          <a className="flex items-center hover:bg-primary bg-primary text-white p-4 rounded-lg ">
            <TicketIcon className="w-6 h-6" />
            <div className="ml-2">
              Gift Card / CD Key / Coupon
            </div>
          </a>
        </li>
        <li className="p-2 border-b">
          <a className="flex items-center p-4 rounded-lg text-gray-400">
            <CodeBracketIcon className="w-6 h-6" />
            <div className="ml-2">
              Custom HTTP
              <div className="badge badge-outline badge-primary ml-2">Coming soon</div>
            </div>
          </a>
        </li>
        <li className="p-2 border-b">
          <a className="flex items-center p-4 rounded-lg text-gray-400">
            <UserGroupIcon className="w-6 h-6" />
            <div className="ml-2">
              NFT Allowlist (Onchain)
              <div className="badge badge-outline badge-primary ml-2">Coming soon</div>
            </div>
          </a>
        </li>
      </ul>

      <CouponsInput coupons={coupons} setCoupons={setCoupons} />


      <SelectFormInput
        label="Action"
        name="schemaId"
        options={schemas?.data.map(schema => ({ label: schema.name, value: schema.id })) || []}
      />

      <label className="label">
        Condition
      </label>

      <div className="grid grid-cols-3 gap-3">
        <SelectFormInput
          label="Field"
          name="conditionField"
          options={fieldOptions.map(f => ({ label: f, value: f })) || []}
        />
        <SelectFormInput
          label="Operator"
          name="conditionOperator"
          options={OPERATORS}
        />
        <TextFormInput label="Value" name="conditionValue" />
      </div>
      {footer}
    </Form>
  );
}
