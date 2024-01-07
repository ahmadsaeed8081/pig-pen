/* eslint-disable no-unused-vars */
import React from "react";

import "./css/App.scss";
import HeaderComp from "./components/Header";
import Home from "./Pages/Home";


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import Web3 from "web3";

function App() {


  const chains = [mainnet]
  const projectId = 'f385bf4e147a499aee6b6c2f17ded944'
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  // const { chains, publicClient } = configureChains(
  //   [polygon],
  //   [({ apiKey: 'tTXdAIDIsIsUyC322Hw-FwS0PPYvO5yw' })],
  // )alchemyProvider
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)





  return (


    <>
    <WagmiConfig config={wagmiConfig}>
    <div className="dashboard-page flex flex-col">
      <HeaderComp />
      <Home />
    </div>

    </WagmiConfig>

<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
</>
  );
}

export default App;
