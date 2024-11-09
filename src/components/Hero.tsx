"use client";
import Link from "next/link";

import { SnailPoolData } from "@/interface/model.interface";
import { useEffect, useState } from "react";
import axios from "axios";
export const Hero = () => {
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [poolData, setPoolData] = useState<SnailPoolData | null>(null);

  const buyurl =
    "https://app.turbos.finance/fun/#/fun/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL";
  const url1 = {
    first:
      "https://wallpapers.com/images/hd/turbo-over-dark-backdrop-jhe1dgo3w7p72ycq.jpg",
    sec: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMg7hfXG7tjuARPP39GjeDmW92VN2h2Dx0fxX6gPxEd_1zCrIGudsXZH6VKgpukwuFxW8&usqp=CAU",
    third: "https://i.ytimg.com/vi/_sjzBa3kVQM/maxresdefault.jpg",
    for: "/turbo2.jpg",
  };

  const url =
    "https://api.turbos.finance/fun/pools/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL";

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await axios.get<SnailPoolData>(url);
        console.log(response.data, "data");
        //setIsLoading(false);
        setPoolData(response?.data);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      }
    };

    fetchPoolData();
  }, []);

  return (
    <div className="relative h-screen mb-10 w-full">
      <div
        className="absolute inset-0 w-full h-[900px] mt-[0px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${url1.for})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative h-full lg:mt-[70px] mt-6 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl mt-[120px] font-bold text-white mb-6">
          Only on Turbos.fun
        </h1>
        <Link target="blank" href={buyurl}>
          <button className="mt-8 px-6 py-3 bg-white/25 border-orange-400/60 border hover:bg-orange-500 text-white rounded-lg transition-colors duration-300">
            Buy $Snail
          </button>
        </Link>
        <p className="text-lg md:text-xl text-white max-w-2xl mt-20 mx-auto leading-relaxed">
          {poolData?.description ||
            "Turbosnail is The ultimate meme token launch on turbos.fun ! Join the slow and steady race to the moon, powered by community. movement and watch it inch its way to the top"}
        </p>
      </div>
    </div>
  );
};
