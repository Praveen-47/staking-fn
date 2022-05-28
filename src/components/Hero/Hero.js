import React from "react";
import Web3 from "web3";
import "./Hero.css";
function Hero({
  handleTotalDecrease,
  mint,
  handleTotalIncrease,
  total,
  totalSupply,
  maxSupply,
  account,
  connectwallet,
  earnings,
  claim,
}) {
  const earning = Web3.utils.fromWei(String(earnings), "ether");
  return (
    <div className="hero__container">
      <div className="block__container">
        <div className="block left">
          <h2>
            MINT <span>BLOCKx</span>{" "}
          </h2>
          <h3>
            {totalSupply} / <span>{maxSupply}</span>
          </h3>
          <div className="cal__wrapper">
            <h2 onClick={handleTotalIncrease}>
              <span style={{ cursor: "pointer" }}>+</span>
            </h2>
            <h2>{total}</h2>
            <h2>
              <span style={{ cursor: "pointer" }} onClick={handleTotalDecrease}>
                -
              </span>
            </h2>
          </div>
        </div>
        <div className="block__button">
          <button onClick={account ? mint : connectwallet}>
            {account ? "Mint" : "Mint"}
          </button>
        </div>
      </div>
      <div className="block__container">
        <div className="block right">
          <h2>
            Earn<span>ings</span>
          </h2>
          <h1>
            {/* {earnings && Web3.utils.fromWei(String(earnings), "ether")}{" "} */}
            {(Math.round(earning * 100) / 100).toFixed(2)}
            <span>BX</span>
          </h1>
          <p>
            To <span>earn BX </span>hold your NFTs
          </p>
        </div>
        <div className="block__button">
          <button onClick={claim}>claim</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
