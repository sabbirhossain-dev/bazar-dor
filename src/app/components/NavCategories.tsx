"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ICategory {
  id: string;
  nameBn: string;
  icon: string;
}

const NavCategories = ({ data }: { data: ICategory[] }) => {
  const pathname = usePathname();

  return (
    <nav className="hidden border-y border-gray-200 bg-white py-3 md:flex">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-0">
        <ul className="flex justify-start gap-3 px-10">
          {data.map((item: ICategory) => {
            const isActive = pathname === `/category/${item.id}`;

            return (
              <li key={item.id}>
                <Link
                  href={`/category/${item.id}`}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-[#1D271F] hover:bg-gray-200 hover:text-green-700 transition-all duration-300"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.nameBn}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavCategories;
