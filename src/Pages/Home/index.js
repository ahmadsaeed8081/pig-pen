import React, { useEffect, useState } from 'react'

import { MinusIcon, PlusIcon } from "../../assets/Icons";
import { useAccount} from "wagmi";
import Web3 from "web3";
import {
cont_abi,cont_add
} from "../../components/config";
import { useNetwork, useSwitchNetwork } from "wagmi";
import {
  useContractReads,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
const imageSources = [
  "./images/website-pig1.jpg",
  "./images/website-pig2.jpg",
  "./images/website-pig3.jpg",
  "./images/website-pig4.jpg",
  "./images/website-pig5.jpg",
  "./images/website-pig6.jpg",
  // "./images/website-pig7.jpg",
  // "./images/website-pig8.jpg",
  // "./images/website-pig9.jpg",
];

const Main = () => {


  const [quantity, set_quantity] = useState("0");
  const [presaleTime, set_presaleTime] = useState(0);

  const increment = () => {
    if(Number(quantity)<10){
      set_quantity(Number(quantity) + 1);
      find_totalAmount()
    }

  };
  const decrement = () => {
    if (Number(quantity) > 0) {
      set_quantity(Number(quantity) - 1);
      find_totalAmount()

    }
  };

  const networkId = 943;




  const [totalCount, setTotalCount] = useState(0);
  const { address, isConnected } = useAccount();

  const [supply, set_supply] = useState(0);
  const [cost, set_cost] = useState(0);
  const [total_price, set_total_price] = useState(0); 
  const [maxSupply, set_maxSupply] = useState(0);
  const [balance, set_balance] = useState(0);
  const [curr_time, set_curr_time] = useState("");
  const [curr_price, set_curr_price] = useState("");


  const [ref, set_ref] = useState("0x0000000000000000000000000000000000000000");




  const { chain } = useNetwork();



  const {
    data: stakeResult,
    isLoading: isLoading_stake,
    isSuccess: stakeSuccess,
    write: mint,
  } = useContractWrite({
    address: cont_add,
    abi: cont_abi,
    functionName: "mint",
    args: [address,quantity],
    value: (Number(quantity)* Number(curr_price)).toString(),
    // value: ((perPlpValue * ((stakeAmount * 3)/100))/perPlsUsd)/10**18,
    onSuccess(data) {
      test();
      console.log("Success", data);
    },
  });




  
  async function mintNft() {
    console.log("object mint "+ref);
    if((Number(curr_price) * Number(quantity)) > Number(balance) )
    {
      alert("you dont have enough balance to buy");
      return
    }
    if(Number(quantity) == 0 || quantity == "")
    {
      alert("kindly write the amount");
      return
    }

    if (chain.id != networkId) {
      mint_switch?.();
    } else {
      mint?.();
    }
  }


  useEffect(()=>{

    if(isConnected)
    {
      test();

    }
  
  },[address])

  function Convert_To_Wei(val) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com	"));
  
    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }
  function Convert_To_eth(val) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com	"));
  
    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }
  async function test() 
  {

    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com	"));


    const balance = await web3.eth.getBalance(address);
    const contract = new web3.eth.Contract(cont_abi, cont_add);
    console.log("object1");
    let supply = await contract.methods.totalSupply().call();
    let public_cost = await contract.methods.cost().call();
    let currentTime = await contract.methods.curr_time().call();  

    let maxSupply = await contract.methods.maxSupply().call();

    set_curr_time(currentTime);
    set_maxSupply(maxSupply);
    set_cost(public_cost)
    // set_presaleTime(presaleTime)
    set_balance(balance)
    set_supply(supply)
    set_curr_price(public_cost)

    // if(curr_time < presaleTime)
    // {
    //   set_curr_price(presale_cost)
    // }
    // else{
    //   set_curr_price(public_cost)

    // }
    console.log("test done");
  }
function find_totalAmount(){
  set_total_price(Number(quantity) * ( Number(Convert_To_eth(curr_price))));
}

  const { switchNetwork: mint_switch } = useSwitchNetwork({
    chainId: networkId,
    // throwForSwitchChainNotSupported: true,
    onSuccess() {
      mint?.();
    },
  });


  const waitForTransaction2 = useWaitForTransaction({
    hash: stakeResult?.hash,
    onSuccess(data) {
      test?.();
      console.log("Success2", data);
    },
  });


  return (
    <div className="lading-page flex flex-col">
      <div className="hero wrapWidth flex max-md:flex-col">
        <div className="flex-1 wrap">
          <h1 className="main-heading">TIME TO GET DIRTY!</h1>
          <div className="paragraph gap-12">
            <p className="pg-1">
              Each one of our cute, cuddly, and ultra clean MAGA Frens are
              generated from over 150 adorable traits!
            </p>
            <p className="pg-1">
              The complexity of this bad-assery, should future proof your
              journey in the mass array of Metaverses for years to come!
            </p>
            <p className="pg-1">
              We shall raid the Zuckerverse together in MAGA Fren style!!
            </p>
            <p className="pg-1">
              Just wait for the IN-BREEDING and BLM-BUDDIES...
            </p>
          </div>
        </div>

        <div className="flex-1 hero-box justify-center items-center ">
          <div className="mt-28 max-md:my-24">
            <h2 className="heading">Start Minting </h2>
            <hr class="w-[50%] mx-auto border-t-4 max-md:w-[80%]" />
            <div className="flex justify-center items-center gap-6">
              <h2 className="heading">MINT</h2>
              <div className="icon" onClick={decrement}>
                <MinusIcon />{" "}
              </div>
              <p className="par">{quantity}</p>
              <div className="icon" onClick={increment}>
                <PlusIcon />{" "}
              </div>
              <h2 className="heading bg-[#E1C884] py-2 px-3 rounded-2xl max-md:rounded-lg">
                10 MAX
              </h2>
            </div>
            <hr class="w-[50%] mx-auto border-t-4 max-md:w-[80%]" />
            <div className="flex justify-center items-center gap-16 max-md:gap-10">
              <h2 className="heading">Total</h2>
              <p className="par">{Number(quantity) * ( Number(Convert_To_eth(curr_price)))} </p>
              <h2 className="heading">ETH</h2>
            </div>
            <button className="btn" onClick={mint}>MINT NOW</button>
            <div className="flex justify-center items-center gap-10 max-md:gap-6">
              <p className="par">{supply}</p>
              <p className="par">/</p>
              <p className="par">{maxSupply}</p>
              <h2 className="heading">MINTED</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-28 max-md:mt-10">
        <div className="last flex max-md:flex-col wrapWidth ">
          <div className="flex-1 wrap">
            <div className="grid grid-cols-3 gap-4">
              {imageSources.map((image, index) => (
                <img key={index} src={image} alt="" className="img-hover" />
              ))}
            </div>
          </div>
          <div className="flex-1 last-box max-md:mt-5">
            <div className="mt-16 max-md:my-16">
              <h1 className="heading">Wanna stay up-to-date?</h1>
              <h2 className="heading-2">
                Join the most amazing Telegram community in the NFT space!
              </h2>
              <a href="#" className="icon">
              <button className="btn">Join community</button>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
