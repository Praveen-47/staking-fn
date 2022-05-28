import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

import CollectionAbi from "./abi/Collection.abi.json";
import TokenAbi from "./abi/RewardToken.abi.json";
import StakingAbi from "./abi/Stake.abi.json";

import cors from "cors";
import Stake from "./components/Stake/Stake";
import Hero from "./components/Hero/Hero";
import Header from "./components/Header/Header";
import Unstake from "./components/Unstake/Unstake";
import styles from "./App.css";

const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "NFT-staking",
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
      rpc: "",
      chainId: 4,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

const stakingContractad = "0x44c74D8eD7Ea9f1621B0E6331653Ce9EB53B5f56";
const collectionContractad = "0x5d463fd8E0498C90646c0eA23811679342c106bc";
const rewardTokenContractad = "0xf5f8BA9874E72D4A433ECE24FEEfdCA338455379";

const tokenAbi = TokenAbi.abi;
const collectionAbi = CollectionAbi.abi;
const stakingAbi = StakingAbi.abi;

const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
const etherScanApiKey = "UTGVN4WFF74Q2RWW1SF4MQV87HQD9Q6QZH";
const endpoint = "https://api-rinkeby.etherscan.io/api";

const web3Modal = new Web3Modal({
  network: "rinkeby",
  theme: "dark",
  cacheProvider: true,
  providerOptions,
});

function App() {
  const [account, setAccount] = useState("");
  const [tokenContract, setTokenContract] = useState(null);
  const [collectionContract, setcollectionContract] = useState(null);
  const [stakingContract, setstakingContract] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [balance, setBalance] = useState(0);
  const [nftData, setNftData] = useState([]);
  const [state, setState] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [nftAssets, setNftAssets] = useState([]);
  const [nftId, setNftId] = useState(null);
  const [unstakeNftId, setunstakeNftId] = useState(null);
  const [total, setTotal] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [stakedIds, setStakedTokenIds] = useState([]);
  const [stakedNftsData, setStakedNftsData] = useState([]);

  var assets;

  async function connectwallet() {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await provider.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      rewardTokenContractad
    );
    const collectionContract = new web3.eth.Contract(
      collectionAbi,
      collectionContractad
    );
    const stakingContract = new web3.eth.Contract(
      stakingAbi,
      stakingContractad
    );

    setTokenContract(tokenContract);
    setcollectionContract(collectionContract);
    setstakingContract(stakingContract);
    // await getTotalSupply();
    const totalSup = Number(
      await collectionContract.methods.totalSupply().call()
    );
    const maxSup = Number(await collectionContract.methods.maxSupply().call());
    setTotalSupply(totalSup);
    setMaxSupply(maxSup);
  }
  // const getTotalSupply = async () => {
  //   const totalSup = Number(
  //     await collectionContract.methods.totalSupply().call()
  //   );
  //   console.log(totalSup);
  // };
  const handleTotalIncrease = () => {
    const newTotal = total + 1;
    if (newTotal <= 3) {
      setTotal(newTotal);
    }
    return;
  };
  const handleTotalDecrease = () => {
    const newTotal = total - 1;
    if (newTotal >= 1) {
      setTotal(newTotal);
    }
    return;
  };
  async function mint() {
    // const mintAmount = Number(document.querySelector("[name=mint]").value);
    const mintRate = Number(await collectionContract.methods.cost().call());
    const totalAmount = total * mintRate;
    collectionContract.methods
      .mint(account, total)
      .send({
        from: account,
        value: Number(totalAmount),
      })
      .once("error", (error) => {
        console.log(error);
      })
      .then((receipt) => {
        console.log(receipt);
        alert("Success", receipt.events.Transfer.blockNumber);
      });
  }

  async function stake() {
    // var tokenids = Number(document.querySelector("[name=stake]").value);

    stakingContract.methods.stake([nftId]).send({ from: account });
  }

  async function unstake() {
    // var tokenids = Number(document.querySelector("[name=unstake]").value);
    stakingContract.methods.unstake([unstakeNftId]).send({ from: account });
  }

  async function getStakedNfts() {
    const stakedTokenIds = await stakingContract.methods
      .tokensOfOwner(account)
      .call();
    console.log(stakedTokenIds);
    setStakedTokenIds(stakedTokenIds);
  }

  // async function getTokenUriForStakedNFTs() {
  //   for (i = stakedTokenIds[0]; i < setStakedTokenIds.length; i++) {
  //     const uri = await collectionContract.methods.tokenURI(i);
  //     return uri;
  //   }
  // }

  async function getTokenUri() {}

  async function earningInfo() {
    // var tokenids = Number(document.querySelector("[name=earnings]").value);
    const m = (1000 * 10 ** 18) / 86400;
    const earnings = stakingContract.methods
      .earningInfo(account, stakedIds)
      .call();
    earnings
      .then((r) => {
        console.log(r && (r.length > 0 ? r : "No data"));
        setEarnings(r[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function claim() {
    // var tokenids = Number(document.querySelector("[name=claim]").value);
    stakingContract.methods.claim(stakedIds).send({ from: account });
  }
  async function verify() {
    var getbalance = Number(
      await stakingContract.methods.balanceOf(account).call()
    );
    setBalance(getbalance);
  }

  const getassets = async () => {
    await axios
      .get(
        openseaapi +
          `?asset_contract_addresses=${collectionContractad}&format=json&order_direction=asc&offset=0&limit=20`
      )
      .then((outputb) => {
        setNftData(outputb.data);
      });
  };

  const getNftIdHandler = (e) => {
    console.log(e.target.id);
    setNftId(e.target.id);
  };
  const unStakeIdHandler = (e) => {
    console.log(e.target.id);
    setunstakeNftId(e.target.id);
  };

  useEffect(() => {
    getassets();
    // getTotalSupply();
    stakingContract && getStakedNfts();
  }, [account]);

  useEffect(() => {
    if (nftData) {
      setNftAssets(
        nftData.assets?.filter(
          (el) => el.owner.address === account.toLowerCase()
        )
      );
    }
  }, [nftData]);

  console.log(nftAssets);

  useEffect(() => {
    if (stakedIds && nftAssets) {
      // setStakedNFTs();
      // stakedIds.map(
      //   (el) =>
      //     collectionContract && collectionContract.methods.tokenURI(el).call()
      // );

      //https://bafybeihkjkso5uohmem7ndin33vjhlc7qve33lehqeuerfkpidqwmlb3aa.ipfs.dweb.link/10.json

      stakedIds.forEach((element) => {
        collectionContract &&
          axios
            .get(
              `https://bafybeihkjkso5uohmem7ndin33vjhlc7qve33lehqeuerfkpidqwmlb3aa.ipfs.dweb.link/${element}.json`
            )
            .then((response) => {
              console.log(response);
              setStakedNftsData((pre) => {
                return [...pre, response.data];
              });
            });
        // collectionContract.methods
        // .tokenURI(element)
        // .call()
        // .then((res) => {
        //   // axios.get(res).then((response) => {
        //   //   setStakedNftsData((pre) => {
        //   //     return [...pre, response];
        //   //   });
        //   // });
        //   console.log(res);
        // });
        // collectionContract &&
        //   setStakedNftsData((pre) => {
        //     return [...pre, collectionContract.methods.tokenURI(el).call()];
        //   });
      });
    }
    // earningInfo();
  }, [stakedIds, account]);

  console.log(stakedNftsData);

  useEffect(() => {
    account && stakingContract && earningInfo();
  }, [account]);

  return (
    <div className="app">
      <div className="app__container">
        <Header connectwallet={connectwallet} account={account} />
        <Hero
          mint={mint}
          account={account}
          handleTotalDecrease={handleTotalDecrease}
          handleTotalIncrease={handleTotalIncrease}
          total={total}
          totalSupply={totalSupply}
          maxSupply={maxSupply}
          connectwallet={connectwallet}
          earnings={earnings}
          claim={claim}
        />
        <Stake
          nftAssets={nftAssets}
          getNftIdHandler={getNftIdHandler}
          account={account}
          mint={mint}
          stake={stake}
          nftId={nftId}
          stakedIds={stakedIds}
        />
        <Unstake
          state={stakedNftsData}
          unStakeIdHandler={unStakeIdHandler}
          account={account}
          unstake={unstake}
          unstakeNftId={unstakeNftId}
        />
      </div>
    </div>
  );
}

export default App;
