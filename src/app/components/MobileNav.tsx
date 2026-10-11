"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserAuth from "./UserAuth";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo-icon.png";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const MobileNav = ({ data }: { data: Category[] }) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const pathname = usePathname();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="sticky top-0 z-50 bg-white md:hidden">
      <div className="mx-auto flex w-full border-b border-gray-200 max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          {/* Menu button */}
          <button
            onClick={() => setMenuToggle((prev) => !prev)}
            className="rounded-md bg-gray-100 p-2 cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            {menuToggle ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-[#05893E] p-2">
              <Image
                src={logo}
                alt="logo"
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1D271F] sm:text-lg">
                বাজার দর
              </h2>
              <p className="text-[9px] text-[#1D271F] opacity-80 sm:text-[11px]">
                {date}
              </p>
            </div>
          </Link>
        </div>

        {/* User authentication */}
        <UserAuth />
      </div>

      {/* Mobile menu */}
      {menuToggle && (
        <div className="absolute left-0 top-full z-50 w-2/3 min-w-[220px] overflow-hidden rounded-b-xl border border-gray-100 bg-white p-3 pb-10 shadow-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {data.map((item) => {
              const isActive = pathname === `/category/${item.id}`;

              return (
                <li key={item.id}>
                  <Link
                    href={`/category/${item.id}`}
                    onClick={() => setMenuToggle(false)}
                    className={`group flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "border-green-200 bg-green-50"
                        : "border-transparent hover:border-green-100 hover:bg-green-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-green-100"
                          : "bg-gray-50 group-hover:bg-green-100"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <h3
                      className={`text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-green-700"
                          : "text-[#1D271F] group-hover:text-green-700"
                      }`}
                    >
                      {item.nameBn}
                    </h3>

                    <span
                      className={`ml-auto transition-all duration-200 group-hover:translate-x-1 ${
                        isActive
                          ? "text-green-600"
                          : "text-gray-300 group-hover:text-green-600"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
