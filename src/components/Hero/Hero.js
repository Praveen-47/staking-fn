import React from "react";
import "./Hero.css";
function Hero() {
  return (
    <div className="block__wrapper">
      <div className="block-left__wrapper">
        <div className="block-left">
          <h2>
            Mint <span>BLOCKx</span>
          </h2>
          <h3>
            9900 / <span>1000</span>
          </h3>
          <div className="cal__sec">
            <button>+</button>
            <p>1</p>
            <button>-</button>
          </div>
        </div>
        <div className="button__wrapper">
          <button className="block__button">Mint</button>
        </div>
      </div>

      <div className="block-right">
        <h2>
          Earn<span>ings</span>
        </h2>
        <h1>
          9900 <span>Bx</span>
        </h1>
        <div className="button__wrapper">
          <button className="block__button">Claim</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
