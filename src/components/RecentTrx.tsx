"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Trade, ApiResponse } from "@/interface/model.interface";

export const TradingHistory: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.turbos.finance/fun/trade/history?page=${currentPage}&address=&tokenAddress=0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL`
        );
        const data: ApiResponse = await response.json();
        setTrades(data.data);
        setTotalPages(Math.ceil(data.total / data.pageSize));
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
      setLoading(false);
    };

    fetchTrades();
  }, [currentPage]);

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const accountUrl = "https://suivision.xyz/account/";
  const trxUrl = "https://suivision.xyz/txblock/";

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const truncateAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ${diffInSeconds % 60}s ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      return `${hours}h ${minutes}m ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      const hours = Math.floor((diffInSeconds % 86400) / 3600);
      return `${days}d ${hours}h ago`;
    }
  };

  return (
    <div className="lg:w-[90%] w-[97%] ml-auto mr-auto bg-black/15 bg-opacity-20 mt-[90px] text-gray-100 rounded-2xl shadow-lg">
      <div className="p-6">
        <div className="flex gap-4 mb-4 border-b border-gray-800">
          <button className="px-4 py-2 text-white border-b-2 border-white">
            Trading History
          </button>
        </div>

        {/* Desktop view - table layout */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-left">
                <th className="p-2">Account</th>
                <th className="p-2">Type</th>
                <th className="p-2">SUI</th>
                <th className="p-2">$Snail</th>
                <th className="p-2">Date</th>
                <th className="p-2">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="p-2">
                    <a
                      target="_blank"
                      href={`${accountUrl}${trade.sender}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {truncateAddress(trade.sender)}
                    </a>
                  </td>
                  <td
                    className={`p-2 ${
                      trade.is_buy ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trade.is_buy ? "Buy" : "Sell"}
                  </td>
                  <td className="p-2">{formatNumber(trade.sui_amount)}</td>
                  <td className="p-2">{formatNumber(trade.token_amount)}</td>
                  <td className="p-2 text-gray-400">
                    {formatDate(trade.timestamp)}
                  </td>
                  <td className="p-2">
                    <a
                      href={`${trxUrl}${trade.tx_digest}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {truncateAddress(trade.tx_digest)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view - card layout */}
        <div className="lg:hidden space-y-4">
          {trades.map((trade, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account</span>

                <a
                  target="_blank"
                  href={`${accountUrl}${trade.sender}`}
                  className="text-blue-400"
                >
                  {truncateAddress(trade.sender)}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Type</span>
                <span
                  className={trade.is_buy ? "text-green-400" : "text-red-400"}
                >
                  {trade.is_buy ? "Buy" : "Sell"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">SUI</span>
                <span>{formatNumber(trade.sui_amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">$Snail</span>
                <span>{formatNumber(trade.token_amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date</span>
                <span className="text-gray-400">
                  {formatDate(trade.timestamp)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction</span>
                <a
                  target="_blank"
                  href={`${trxUrl}${trade.tx_digest}`}
                  className="text-blue-400"
                >
                  {truncateAddress(trade.tx_digest)}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || loading}
            className={`flex items-center px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors
              ${
                currentPage === 1 || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <span className="text-gray-400">
            <span className="lg:flex hidden">Page</span> {currentPage} of{" "}
            {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || loading}
            className={`flex items-center px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors
              ${
                currentPage === totalPages || loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
