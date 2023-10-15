import React, { FC, useEffect, useState } from 'react';
import { contractContext } from '../contexts/contract';

export interface ContractContextProviderProps {
  children: React.ReactNode;
}

export const ContractContextProvider: FC<ContractContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const contractAddressOnUrl = params.get('contract');
    if (contractAddressOnUrl) {
      setAddress(contractAddressOnUrl);
    }
    setLoading(false);
  }, []);
  if (loading) {
    // TODO: Use a spinner here
    return null;
  }
  return (
    <contractContext.Provider value={{ address, setAddress }}>
      {children}
    </contractContext.Provider>
  )
}
