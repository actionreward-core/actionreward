import { createContext } from "react";

export const contractContext = createContext<{
  address?: string,
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>
}>({
  setAddress: () => null
});