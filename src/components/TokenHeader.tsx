"use client";
import React, { useEffect, useState } from "react";
import { Twitter, Send, Copy } from "lucide-react";
//import Link from "next/link";
import { SnailPoolData } from "@/interface/model.interface";
import toast from "react-hot-toast";

const TokenHeader = () => {
  const [poolData, setPoolData] = useState<SnailPoolData>();
  const [error, setError] = useState("");
  const accountUrl = "https://suivision.xyz/account/";
  const coinUrl = "https://suivision.xyz/coin/";
  const fetchPoolData = async () => {
    try {
      const response = await fetch(
        "https://api.turbos.finance/fun/pools/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL"
      );
      const data = await response.json();
      setPoolData(data);
    } catch (err) {
      setError("Failed to fetch pool data");
      console.error("Error fetching pool data:", err);
    }
  };

  useEffect(() => {
    fetchPoolData();
    const interval = setInterval(fetchPoolData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-5)}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  };

  const handleCopyAddress = async () => {
    if (poolData?.token_address) {
      await navigator.clipboard.writeText(poolData.token_address);
      toast.success("CA Copied Successfull!!");
    }
  };

  if (error)
    return (
      <div className="text-white flex items-center justify-center">{error}</div>
    );
  if (!poolData)
    return (
      <div className="text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="lg:w-[90%] w-[97%] ml-auto mr-auto mb-10 bg-black/15 bg-opacity-25 p-6 md:p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex justify-center md:block">
          <img
            src={poolData.token_metadata.iconUrl}
            alt={poolData.name}
            className="w-[100px] h-[100px] md:w-44 md:h-44 rounded-lg"
          />
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
            <h1 className="text-xl md:text-2xl text-white font-bold mb-2 md:mb-0">
              {poolData.name} (${poolData.symbol})
            </h1>
            <div className="flex gap-4">
              <a
                href={poolData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href={poolData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Send className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">CA:</span>
              <a
                target="_blank"
                href={`${coinUrl}${poolData.token_address}`}
                className="text-blue-400"
              >
                {formatAddress(poolData.token_address)}
              </a>
              <button
                onClick={handleCopyAddress}
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Created by:</span>
              <span className="text-blue-400">
                <a
                  target="_blank"
                  href={`${accountUrl}${poolData.created_by}`}
                  className="text-blue-400"
                >
                  {formatAddress(poolData.created_by)}
                </a>
              </span>
              <span className="text-gray-400">
                {formatTimeAgo(poolData.created_at)}
              </span>
            </div>
          </div>

          <p className="text-gray-300 text-center md:text-left mb-6 md:mb-8">
            {poolData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenHeader;
