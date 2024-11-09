"use client";

import { SnailPoolData } from "@/interface/model.interface";

import { useEffect, useState } from "react";

export const Token = () => {
  const [poolData, setPoolData] = useState<SnailPoolData>();

  const fetchPoolData = async () => {
    try {
      const response = await fetch(
        "https://api.turbos.finance/fun/pools/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL"
      );
      const data = await response.json();
      setPoolData(data);
    } catch (err) {
      //setError("Failed to fetch pool data");
      console.error("Error fetching pool data:", err);
    }
  };

  useEffect(() => {
    fetchPoolData();
    const interval = setInterval(fetchPoolData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10 lg:w-[93%] ml-auto mr-auto p-4 lg:mt-[200px] mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-black/0 bg-opacity-25 rounded-xl p-4 items-center justify-center">
        <div className="text-center md:text-left">
          <div className="text-gray-400 text-sm md:mb-1">Price $SUI</div>
          <div className="text-white text-base md:text-lg">
            {poolData?.token_price_sui.toFixed(9)} $SUI
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-gray-400 text-sm md:mb-1">Price $USD</div>
          <div className="text-white text-base md:text-lg">
            {poolData?.token_price_usd.toFixed(9)} $
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-gray-400 text-sm md:mb-1">Market Cap</div>
          <div className="text-white text-base md:text-lg">
            $
            {poolData?.market_cap_usd.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-gray-400 text-sm md:mb-1">24H Volume</div>
          <div className="text-white text-base md:text-lg">
            {poolData?.volume_24h_sui.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            $SUI
          </div>
        </div>
      </div>
    </div>
  );
};
