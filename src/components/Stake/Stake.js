import React from "react";
import image from "../../assets/images/2.png";
import "./Stake.css";
function Stake({ nftAssets, getNftIdHandler }) {
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
    {
      /* <img
                  id={result.token_id}
                  src={result.image_original_url}
                  onClick={getNftIdHandler}
                  alt=""
                /> */
    },
  ];
  return (
    <div className="stake__container">
      <div className="stake__text__wrapper">
        <h1 className="stake__title">Stake My NFTs</h1>
        <h3 className="stake__selected">
          <span>2</span> NFTs Selected
        </h3>
      </div>

      <div className="data__wrapper">
        {data ? (
          data.map((result, id) => {
            return (
              <div key={id} className="image__wrapper">
                <img src={image} className="image" />
              </div>
            );
          })
        ) : (
          <h1>No Data</h1>
        )}
      </div>
    </div>
  );
}

export default Stake;
