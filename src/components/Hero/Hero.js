import React from "react";
import "./Hero.css";
function Hero() {
  return (
    <div className="container">
      <div className="left">
        <div className="block left">
          <h2>
            MINT <span>BLOCKx</span>{" "}
          </h2>
          <h3>
            9990 / <span>10000</span>
          </h3>
          <div className="cal__wrapper">
            <h2>
              <span>+</span>
            </h2>
            <h2>1</h2>
            <h2>
              <span>-</span>
            </h2>
          </div>
        </div>
        <div className="button-left">
          <button>Mint</button>
        </div>
      </div>
      <div className="right">
        <div className="block right">
          <h2>
            Earn<span>ings</span>
          </h2>
          <h1>
            100 <span>BX</span>
          </h1>
          <p>
            To <span>earn BX </span>hold your NFTs
          </p>
        </div>
        <div className="button-right ">
          <button>claim</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
