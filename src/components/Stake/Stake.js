import React from "react";
import image from "../../assets/images/2.png";

function Stake() {
  const data = [
    {
      id: "1",
      img: image,
      title: "Net2Dev Web3 NFT Number #1",
      buttontext: "Buy Now",
    },
    {
      id: "2",
      img: image,
      title: "Net2Dev Web3 NFT Number #2",
      buttontext: "Buy Now",
    },
    {
      id: "3",
      img: image,
      title: "Net2Dev Web3 NFT Number #3",
      buttontext: "Buy Now",
    },
    {
      id: "4",
      img: image,
      title: "Net2Dev Web3 NFT Number #4",
      buttontext: "Buy Now",
    },
  ];
  return (
    <div>
      <h1>Stake My NFTs</h1>
      <div>
        {data.map((item, id) => {
          return (
            <div key={id}>
              <img src={image} alt="NFT" />
              <h3>
                id:<span>{item.id}</span>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stake;
