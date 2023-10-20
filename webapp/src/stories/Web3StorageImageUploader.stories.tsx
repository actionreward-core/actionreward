import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3StorageImageUploader } from "../components/Web3StorageImageUploader";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const queryClient = new QueryClient();

const meta: Meta<typeof Web3StorageImageUploader> = {
  component: Web3StorageImageUploader,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    )
  ]
};

export default meta;

export const Avatar: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cid, setCid] = useState<string>('bafybeifz2jvz2etphw7sqvirja555oa36nz7twbqyufwj5oim4l67lw5d4');
    console.log(cid);
    return (
      <Web3StorageImageUploader
        value={cid}
        onChange={(cid) => setCid(cid)}
        previewWidth={128}
        previewHeight={128}
      />
    );
  },
};

export const Landscape: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cid, setCid] = useState<string>();
    return (
      <Web3StorageImageUploader
        value={cid}
        onChange={(cid) => setCid(cid)}
        previewWidth={256}
        previewHeight={128}
      />
    );
  },
};

export const Portrait: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cid, setCid] = useState<string>();
    return (
      <Web3StorageImageUploader
        value={cid}
        onChange={(cid) => setCid(cid)}
        previewWidth={128}
        previewHeight={256}
      />
    );
  },
};