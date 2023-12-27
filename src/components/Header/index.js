import React, { useState } from 'react'
import { DiscordIcon, TwitterIcon, MenuIcon } from "../../assets/Icons";
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
const Header = () => {

  const { open, close } = useWeb3Modal()
  const { address, isConnected,isDisconnected } = useAccount()

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="flex items-center justify-center logo-img">
            <img src="./images/website-logo.png" className="logo" />
          </div>
        </div>
        <div className="right  ">
          <div className="menu flex items-center justify-end mx-5">
            {/* <a href="/" className="mint">
              mint
            </a> */}
            {/* <a href="#" className="icon">
              <DiscordIcon />
            </a> */}
            <a href="https://twitter.com/SnappySqueals" className="icon">
              <TwitterIcon />
            </a>
            <button className="btn"onClick={open} >{isConnected?address.slice(0,5)+"..."+address.slice(38,42): 'Connect Wallet' }</button>
          </div>
        </div>
        <div
          className="menu-icon flex items-center justify-center"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   setOpenSidebar(!openSidebar);
          // }}
        >
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
