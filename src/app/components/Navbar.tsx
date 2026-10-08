import Image from "next/image";
import React from "react";
import logo from "../../../public/logo-icon.png";
import Link from "next/link";
import NavCategories from "./NavCategories";
import MarqueeComponent from "./Marquee";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <>
      <div className="bg-white sticky top-0 z-50">
        <div className="flex justify-between gap-5 py-3 items-center max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-0">
          <div className="flex gap-2 md:gap-3 items-center">
            {/* logo */}
            <Link href="/">
              <div className="bg-[#05893E] p-2 md:p-3 rounded-xl">
                <Image
                  src={logo}
                  alt="logo"
                  width={10}
                  height={10}
                  className="h-6 w-6"
                />
              </div>
            </Link>

            <div>
              <h2 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] text-black">
                বাজার দর
              </h2>
              <p className="font-normal opacity-80 text-[10px] sm:text-[11px] md:text-[12px] text-black">
                {date}
              </p>
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-2 md:gap-5">
            <Link
              href="/sign-in"
              className="font-bold text-[12px] md:text-[14px] text-black px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
            >
              সাইন ইন
            </Link>
            <Link
              href="/sign-up"
              className="font-bold text-[12px] md:text-[14px] text-white bg-[#05893E] px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <NavCategories />
        <MarqueeComponent />
      </div>
    </>
  );
};

export default Navbar;
