"use client";

import { useState } from "react";
import ItemCard from "@/app/components/ItemCard";
import { IType } from "@/app/types/type";

type SortOrder = "default" | "asc" | "desc";

type SortedItemsProps = {
  data: IType[];
};

export default function SortedItems({ data }: SortedItemsProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedData = [...data].sort((a, b) => {
    const priceA = Number(a.today);
    const priceB = Number(b.today);

    if (sortOrder === "asc") return priceA - priceB;
    if (sortOrder === "desc") return priceB - priceA;

    return 0;
  });

  return (
    <>
      <div className="flex gap-2 justify-end items-center p-2 md:p-4 bg-white border border-gray-200 rounded-lg my-6">
        <label
          htmlFor="sort"
          className="font-normal text-[13px] md:text-[14px] text-[#1D271F] opacity-70"
        >
          সাজান:
        </label>

        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] md:text-[16px] font-normal text-[#1D271F] outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি </option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <h3 className="font-normal text-[12px] md:text-[14px] text-[#1D271F] py-2 opacity-70">
        মোট {sortedData.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {sortedData.map((item) => (
          <ItemCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
