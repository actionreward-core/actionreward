/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { TextAreaFormInput } from "../../../components/forms/inputs/TextAreaFormInput";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../components/Form";

const meta: Meta<typeof TextAreaFormInput> = {
  title: 'Forms/Inputs/TextAreaFormInput',
  component: TextAreaFormInput,
};

export default meta;

const schema = yup.object().shape({
  message: yup.string().label('Message').min(10).required(),
}).required();


export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ message: string }>({
      resolver: yupResolver(schema),
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <TextAreaFormInput
          name="message"
          label="Message"
        />
      </Form>
    );
  },
};