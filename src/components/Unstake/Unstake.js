import React from "react";
import image from "../../assets/images/2.png";
import "./Unstake.css";
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
function Unstake({ state, unStakeIdHandler, account, unstake, unstakeNftId }) {
  return (
    <div className="unstake__container">
      <div className="unstake__text__wrapper">
        <h1>Staked NFTs</h1>
        <h3>
          {account ? "" : "Not Conneced"}
          {account && (
            <div>
              NFT id :<span>{unstakeNftId} Selected</span>{" "}
            </div>
          )}
        </h3>
      </div>
      <div className="unstake__data_wrapper">
        {state ? (
          state.map((el, id) => {
            return (
              <div key={id} className="unstake__image__wrapper">
                <img
                  src={`https://bafybeig4f2i26wtmakbwjnnoy27x6wgdzwhmp2r77l5iwc6qys3ooovawq.ipfs.dweb.link/${el.edition}.png`}
                  // https://bafybeig4f2i26wtmakbwjnnoy27x6wgdzwhmp2r77l5iwc6qys3ooovawq.ipfs.dweb.link/11.png
                  className="unstake__image"
                  id={el.edition}
                  onClick={unStakeIdHandler}
                />
              </div>
            );
          })
        ) : (
          <h1>
            No Data{" "}
            {account ? "Please Stake NFTs" : "Please connect to rinkeby"}
          </h1>
        )}
      </div>
      <div className="unstake__button__wrapper">
        <button className="unstake__button" onClick={unstake}>
          Unstake
        </button>
      </div>
    </div>
  );
}

export default Unstake;
