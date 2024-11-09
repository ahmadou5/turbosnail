//import Image from "next/image";

import { Hero } from "@/components/Hero";
import { Navbar2 } from "@/components/NavBar";
import { Recent } from "@/components/RecentTrx";

export default function Home() {
  return (
    <div className="">
      <Navbar2 />
      <Hero />
      <Recent />
    </div>
  );
}
