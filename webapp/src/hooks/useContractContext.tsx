import { useContext } from "react";
import { contractContext } from "../contexts/contract";

export const useContractContext = () => useContext(contractContext);