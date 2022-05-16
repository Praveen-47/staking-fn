    <div className="App">
        <h1>NFT Staking dapp</h1>
        <button onClick={connectwallet}>
          {account ? "Connected" : "Connect"}
        </button>
        <input
          placeholder="Mint"
          type="number"
          name="mint"
          defaultValue={1}
          min={1}
          max={5}
        />
        <button onClick={mint}>Mint</button>
        <input
          placeholder="Stake"
          type="number"
          name="stake"
          value={nftId}
          onChange={stakeIdHandler}
        />
        <button onClick={stake}>Stake</button>
        <input placeholder="Unstake" type="number" name="unstake" />
        <button onClick={unstake}>Unstake</button>
        <button onClick={verify}>Verify</button>
        <h3>Account : {account}</h3>
        <h3>StakingContract : {stakingContract && stakingContractad}</h3>
        <input
          placeholder="earnings for tokens"
          type="number"
          name="earnings"
        />
        <h3>Earn : {Web3.utils.fromWei(String(earnings), "ether")}</h3>
        <button onClick={earningInfo}>See Earnings</button>
        <h3>your NFT balance {balance}</h3>
        <input placeholder="claim for tokens" type="number" name="claim" />
        <button onClick={claim}>claim</button>
        <button onClick={getassets}>getassets</button>

        {nftData.assets && console.log("NFTSSYGUSG", nftData)}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "gray",
          }}
        >
          {nftAssets ? (
            nftAssets.map((result, id) => {
              return (
                <div key={id}>
                  <img
                    id={result.token_id}
                    src={result.image_original_url}
                    onClick={getNftIdHandler}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      alignSelf: "center",
                    }}
                  />
                </div>
              );
            })
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>
    </div>