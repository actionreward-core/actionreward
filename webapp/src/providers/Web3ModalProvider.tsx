/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { FC } from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { localhost, polygon, polygonMumbai } from 'wagmi/chains'

const chains = [localhost, polygon, polygonMumbai]
const projectId = import.meta.env.VITE_WEB3_MODAL_PROJECT_ID as string;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export const Web3ModalProvider: FC<Web3ModalProviderProps> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}
