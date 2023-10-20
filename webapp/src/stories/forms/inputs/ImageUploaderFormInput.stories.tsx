/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { ImageUploaderFormInput } from "../../../components/forms/inputs/ImageUploaderFormInput";
import { Meta, StoryObj } from "@storybook/react";
import { Form } from "../../../components/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof ImageUploaderFormInput> = {
  title: 'Forms/Inputs/ImageUploaderFormInput',
  component: ImageUploaderFormInput,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    )
  ]
};

export default meta;


export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ imageIPFS: string }>({
      mode: 'onBlur',
      defaultValues: {
        imageIPFS: 'bafybeihb6l3rs4ceu7shbsape6jdj3qb7x7b7q6fupbenfv7s4mcz5trse',
      }
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <ImageUploaderFormInput
          name="imageIPFS"
          label="Image"
          previewWidth={240}
          previewHeight={240}
        />
      </Form>
    );
  },
};