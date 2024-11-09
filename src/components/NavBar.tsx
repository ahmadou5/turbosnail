"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { XIcon, AlignJustify } from "lucide-react";
import Link from "next/link";
import { SnailPoolData } from "@/interface/model.interface";
export const Navbar2 = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [poolData, setPoolData] = useState<SnailPoolData | null>(null);
  const buyurl =
    "https://app.turbos.finance/fun/#/fun/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL";
  const url =
    "https://api.turbos.finance/fun/pools/0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL";

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await axios.get<SnailPoolData>(url);
        console.log(response.data, "data");
        setIsLoading(false);
        setPoolData(response?.data);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      }
    };

    const interval = setInterval(fetchPoolData, 6000); // Fetch data every 60 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${
          expand ? "bg-black/15" : "transparent"
        } ${
          expand ? "rounded-b-3xl" : ""
        } bg-opacity-50 backdrop-filter backdrop-blur-md`}
      >
        <div
          className={`container mx-auto flex-col lg:py-4 px-3 ${
            expand ? "py-4" : "py-4"
          }`}
        >
          <div className="flex">
            <img
              className="h-12 w-12  ml-4 lg:ml-2 mr-1 rounded-full"
              src="https://r.turbos.finance/icon/1730723361970.jpeg"
            />
            <p className="lg:text-2xl text-xl text-slate-200 ml-1 lg:mt-4 mt-5 mr-20 font-medium">
              TurboSnail
            </p>
            <div className="lg:flex ml-auto  mr-5 hidden gap-6">
              {["Snail"].map((item) => (
                <button
                  key={item}
                  className="text-white/75 lg:text-2xl flex text-xl mt-3 mr-8 hover:text-white/70"
                >
                  <div className="flex items-center  ml-2 mr-2 justify-center">
                    {isLoading ? (
                      <div className="h-10 w-[200px]  rounded-2xl bg-slate-400/30  animate-pulse"></div>
                    ) : (
                      <>
                        {" "}
                        <img
                          src="data:image/png;base64,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"
                          className="h-7 w-7 ml-1  mr-1 rounded-full"
                        />
                        {`Price USDT: $${poolData?.token_price_usd.toFixed(9)}`}
                      </>
                    )}
                  </div>
                  <div className="flex items-center ml-2 mr-2 justify-center">
                    {isLoading ? (
                      <div className="h-10 w-[200px]  rounded-2xl bg-slate-400/30  animate-pulse"></div>
                    ) : (
                      <>
                        {" "}
                        <img
                          src="data:image/png;base64,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"
                          className="h-7 w-7 ml-1  mr-1 rounded-full"
                        />
                        {`Price SUI: $${poolData?.token_price_sui.toFixed(9)}`}
                      </>
                    )}
                  </div>
                </button>
              ))}
              <div className="mb-0 ml-auto mr-3 ">
                <Link target="blank" href={buyurl}>
                  <button className="border-orange-400/75 border h-9 w-[190px] mt-2 hover:bg-orange-500/70 hover:border-white rounded-lg">
                    Buy Snail
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex ml-auto mt-2 mr-3 lg:hidden">
              {expand ? (
                <XIcon onClick={() => setExpand(false)} />
              ) : (
                <AlignJustify onClick={() => setExpand(true)} />
              )}
            </div>
          </div>

          {expand && (
            <div className="flex h-[180px] flex-col rounded-b-2xl items-center justify-center  mt-0 lg:hidden">
              <div className="ml-3 mr-auto flex flex-col mb-2">
                {["Snail"].map((item) => (
                  <div
                    key={item}
                    className="text-white/75 lg:text-2xl text-lg  mt-9  hover:text-white/70"
                  >
                    <div className="flex items-center mb-1  justify-center">
                      {isLoading ? (
                        <div className="h-7 w-[180px] rounded-xl bg-slate-400/30 animate-pulse"></div>
                      ) : (
                        <>
                          {" "}
                          <img
                            src="data:image/png;base64,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"
                            className="h-6 w-6 ml-1  mr-1 rounded-full"
                          />
                          {`Price USDT: $${poolData?.token_price_usd.toFixed(
                            9
                          )}`}
                        </>
                      )}
                    </div>
                    <div className="flex items-center mt-1 justify-center">
                      {isLoading ? (
                        <div className="h-7 w-[180px] rounded-xl bg-slate-400/30 animate-pulse"></div>
                      ) : (
                        <>
                          <img
                            src="data:image/png;base64,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"
                            className="h-6 w-6 ml-1  mr-1 rounded-full"
                          />
                          {`Price SUI: $${poolData?.token_price_sui.toFixed(
                            9
                          )}`}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4 mt-5">
                <Link href={buyurl} target="blank">
                  <button className="border-orange-400/75 border h-9 w-[170px] hover:bg-orange-500/70 rounded-lg">
                    Buy Snail
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
