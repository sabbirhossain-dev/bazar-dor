import Image from "next/image";
import logo from "../../../public/logo-icon.png";
import Link from "next/link";
import NavCategories from "./NavCategories";
import MarqueeComponent from "./Marquee";
import UserAuth from "./UserAuth";
import MobileNav from "./MobileNav";
// import ResNavCategory from "./ResNavCategory";
const Navbar = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    // "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  // if (!res.ok) {
  //   res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  // }

  const data = await res.json();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
      <div className="bg-white sticky top-0 z-50 ">
        {/* menubar for responsive */}
        <div className="md:hidden">
          <MobileNav data={data} />
        </div>
        {/* mobile menu part */}

        <div className="hidden md:flex">
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
                    className="h-5 w-5 md:h-6 md:w-6"
                  />
                </div>
              </Link>

              <div>
                <h2 className="font-bold text-[14px] sm:text-[18px] md:text-[20px] text-[#1D271F]">
                  বাজার দর
                </h2>
                <p className="font-serif font-normal opacity-80 text-[9px] sm:text-[11px] md:text-[12px] text-[#1D271F]">
                  {date}
                </p>
              </div>
            </div>

            {/* buttons */}
            <UserAuth />
          </div>
        </div>
        <NavCategories data={data} />

        <MarqueeComponent />
      </div>
    </>
  );
};

export default Navbar;
