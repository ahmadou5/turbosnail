"use client";

import { Copy } from "lucide-react";

export const Hero = () => {
  const hanleCopy = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        alert("Copied.Successfully");
      },
      (err) => {
        // Failed to copy to clipboard
        console.log(err);
      }
    );
  };

  const url1 = {
    first:
      "https://wallpapers.com/images/hd/turbo-over-dark-backdrop-jhe1dgo3w7p72ycq.jpg",
    sec: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMg7hfXG7tjuARPP39GjeDmW92VN2h2Dx0fxX6gPxEd_1zCrIGudsXZH6VKgpukwuFxW8&usqp=CAU",
    third: "https://i.ytimg.com/vi/_sjzBa3kVQM/maxresdefault.jpg",
    for: "/turbo2.jpg",
  };

  return (
    <div className="relative h-screen w-full">
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
        <button className="mt-8 px-6 py-3 bg-white/25 border-orange-400/60 border hover:bg-orange-500 text-white rounded-lg transition-colors duration-300">
          Buy $Snail
        </button>
        <p className="text-lg md:text-xl text-white max-w-2xl mt-20 mx-auto leading-relaxed">
          Snails are Slow and Sluggish but they{" "}
          <span className="h-10 bg-black/30 w-auto p-1 rounded-xl text-xl ">
            Courageous
          </span>{" "}
          and Never{" "}
          <span className="h-10 bg-black/30 w-auto p-1 rounded-xl text-xl ">
            tired
          </span>
        </p>
        <div className="mt-[200px] w-[100%]">
          <div className="bg-black/40 w-[90%] flex py-4 px-2 ml-auto mr-auto h-14 rounded-full">
            <p className="text-white/75 ml-auto mr-4">
              0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL
            </p>
            <Copy
              onClick={() =>
                hanleCopy(
                  "0xe1fe7dbc2da922e7d4eb41adf1c08d8cafc6cc05ececafdb3fbd436e1922096e::snail::SNAIL"
                )
              }
              className="ml-2 mr-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
