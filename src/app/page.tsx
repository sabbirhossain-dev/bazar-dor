import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IType } from "./types/type";
import ItemCard from "./components/ItemCard";
import Banner from "./components/Banner";

export default async function Home() {
  //all products
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: IType[] = await res.json();
  // console.log(data.length);

  //price up data
  const upData = data.filter((item: IType) => item.change.dir === "up");
  const sortedUpData: IType[] = [...upData].sort(
    (a, b) => b.change.pct - a.change.pct,
  );
  const priceUpData = sortedUpData.slice(0, 6);
  // console.log(priceUpData);

  //price down data
  const downData = data.filter((item: IType) => item.change.dir === "down");
  const sortedDownData: IType[] = [...downData].sort(
    (a, b) => a.change.pct - b.change.pct,
  );
  const priceDownData = sortedDownData.slice(0, 6);
  // console.log(priceDownData);

  // bangla number
  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };
  return (
    <div className="flex flex-col gap-5 pt-7 pb-20">
      <div>
        <Banner />
      </div>

      <section className="px-4 sm:px-8 md:px-10 lg:px-0 flex flex-col gap-10">
        {/* দাম বেড়েছে || price up part*/}
        <div>
          <h2 className="flex items-center gap-1 font-bold text-black py-3">
            <span className="text-red-600">
              <FaCaretUp size={26} />
            </span>
            আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {priceUpData.map((item) => (
              <ItemCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* দাম কমেছে || price down part */}
        <div>
          <h2 className="flex items-center gap-1 font-bold text-black py-3">
            <span className="text-green-600">
              <FaCaretDown size={26} />
            </span>
            আজ দাম কমেছে
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {priceDownData.map((item) => (
              <ItemCard key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* সব পণ্য || all product part*/}
        <div id="all">
          <h2 className="font-bold text-black py-3 pb-1">সব পণ্য</h2>
          <p className="font-normal text-[14px] text-[#1D271F] opacity-70 pb-3">{`মোট ${toBanglaNumber(data.length)}টি পণ্য দেখানো হচ্ছে`}</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {data.map((item) => (
              <ItemCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
