import React, { FC, useEffect } from 'react'
import { useContractContext } from '../hooks/useContractContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../consts/paths';

export interface RequireContractProps {
  children: React.ReactNode;
}

export const RequireContract: FC<RequireContractProps> = ({ children }) => {
  const navigate = useNavigate();
  const { address } = useContractContext();
  useEffect(() => {
    if (!address) {
      navigate(PATHS.configureContract);
    }
  }, [address, navigate])
  return children;
}
