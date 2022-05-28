import React from "react";
import image from "../../assets/images/2.png";
import "./Stake.css";
function Stake({ nftAssets, getNftIdHandler, mint, account, stake, nftId }) {
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
                  0x44c74D8eD7Ea9f1621B0E6331653Ce9EB53B5f56
                /> */
    },
  ];

  return (
    <div className="stake__container">
      <div className="stake__text__wrapper">
        <h1 className="stake__title">My NFTs</h1>
        <h3 className="stake__selected">
          {account ? (
            <div>
              NFT id: <span>{nftId ? nftId : "Select NFT to stake"}</span>{" "}
              Selected
            </div>
          ) : (
            "Not Connected"
          )}
        </h3>
      </div>

      <div className="data__wrapper">
        {nftAssets?.length > 0 ? (
          nftAssets.map((result, id) => {
            // console.log(result);
            return (
              <div key={result.token_id} className="image__wrapper">
                <img
                  id={result.token_id}
                  src={result.image_original_url}
                  onClick={getNftIdHandler}
                  className="image"
                />
              </div>
            );
          })
        ) : (
          <h1 className="n__mint">Mint NFTs to stake</h1>
        )}
      </div>
      <div className="stake__button__wrapper">
        <button className="stake__button" onClick={stake}>
          Stake
        </button>
      </div>
    </div>
  );
}

export default Stake;
