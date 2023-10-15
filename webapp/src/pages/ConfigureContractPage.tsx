import { FC, useEffect } from "react";
import { SetContractForm } from "../components/forms/SetContractForm";
import { useContractContext } from "../hooks/useContractContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";

export interface ConfigureContractPageProps {}

export const ConfigureContractPage: FC<ConfigureContractPageProps> = () => {
  const navigate = useNavigate();
  const { setAddress } = useContractContext();
  const form = useForm<{ address: string }>();
  const { address } = useContractContext();
  useEffect(() => {
    if (address) {
      navigate(PATHS.app);
    }
  }, [address, navigate]);
  return (
    <div className="flex w-screen h-screen items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <h1 className="font-semibold text-2xl">Welcome to SampleExample</h1>
        <p className="my-4 text-base-content/70">
          Before continue, insert below the contract address that you want to
          use
        </p>
        <SetContractForm
          form={form}
          onSubmit={({ address }) => {
            setAddress(address);
            navigate(PATHS.app);
          }}
        />
      </div>
    </div>
  );
};
