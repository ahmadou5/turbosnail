"use client";
import { SnailPoolData } from "@/interface/model.interface";
import React, { useEffect, useState } from "react";

export const BondingCurveProgress: React.FC = () => {
  const [poolData, setPoolData] = useState<SnailPoolData | null>(null);
  const [error, setError] = useState<string>("");

  const fetchPoolData = async () => {
    try {
      const response = await fetch(
        "https://api.turbos.finance/fun/pools/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL"
      );
      const data: SnailPoolData = await response.json();
      setPoolData(data);
    } catch (err) {
      setError("Failed to fetch pool data");
      console.error("Error fetching pool data:", err);
    }
  };

  useEffect(() => {
    fetchPoolData();
    const interval = setInterval(fetchPoolData, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!poolData) {
    return <div className="text-white">Loading...</div>;
  }

  // Calculate progress percentages
  const totalTokenSupply = parseFloat(poolData.token_supply);
  const remainingTokens = parseFloat(poolData.remain_token_reserves);
  const real = parseFloat(poolData.real_token_reserves);
  const virtual = parseFloat(poolData.virtual_token_reserves);
  const bondingCurveProgress =
    ((totalTokenSupply - real - virtual + remainingTokens) / totalTokenSupply) *
    100;

  // Format numbers for display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatLargeNumber = (num: string) => {
    const value = parseFloat(num);
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 1000000); // Convert to millions
  };

  return (
    <div className="bg-black/10 bg-opacity-25 lg:py-20 lg:px-14 lg:h-[390px] p-7 rounded-2xl lg:w-[90%] w-[97%] ml-auto mr-auto ">
      <div className="space-y-6">
        {/* Bonding Curve Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white lg:text-2xl text-lg">
              Bonding Curve Progress:
            </span>
            <span className="text-white">
              {formatNumber(bondingCurveProgress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500/40 rounded-full"
              style={{ width: `${bondingCurveProgress}%` }}
            />
          </div>
          <div className="mt-2 lg:mt-12 text-white/75 lg:text-xl text-sm">
            <p>
              There are{" "}
              <span className="text-md font-bold">
                {formatLargeNumber(poolData.real_token_reserves)}
              </span>{" "}
              $Snail still available for sale in the bonding curve and there are{" "}
              <span className="text-md font-bold">
                {" "}
                {formatNumber(
                  parseFloat(poolData.real_sui_reserves) / 1e9
                )}{" "}
              </span>{" "}
              $SUI in the bonding curve.
            </p>
            <p className="mt-1">
              When the market cap reaches{" "}
              <span className="text-md font-bold">{"6,000"}</span> $SUI, all the
              liquidity from the bonding curve will be deposited onto Turbos D
              <span className="text-md font-bold"></span>EX and locked. Progress
              increases as the price goes up.
            </p>
          </div>
        </div>

        {/* King of Racing Progress */}
      </div>
    </div>
  );
};

export default BondingCurveProgress;
