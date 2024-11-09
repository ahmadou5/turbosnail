//import Image from "next/image";

import { Hero } from "@/components/Hero";
import { Navbar2 } from "@/components/NavBar";
import BondingCurveProgress from "@/components/ProgressBar";
import { TradingHistory } from "@/components/RecentTrx";
import { Token } from "@/components/TokenDetails";
import TokenHeader from "@/components/TokenHeader";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="">
      <Navbar2 />
      <Hero />
      <Token />
      <TokenHeader />
      <BondingCurveProgress />
      <TradingHistory />
      <Toaster />
    </div>
  );
}
