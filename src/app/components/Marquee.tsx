import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IType } from "../types/type";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Link from "next/link";

const MarqueeComponent = async () => {
  //all products
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/products",
    // "https://api.abcz.workers.dev/api/bazardor/products",
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  //   const marqueeData = data.slice(0, 20);

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    g: "গ্রাম",
    litre: "লিটার",
    ml: "মিলিলিটার",
    piece: "পিস",
    dozen: "ডজন",
    maund: "মণ",
  };
  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };

  return (
    <div className="bg-white ">
      <MarqueeText duration={12} direction="right">
        <div className="flex">
          {data.map((item: IType) => (
            <div
              key={item.id}
              className="flex gap-1 items-center border-r px-5 py-3 border-b border-gray-200 hover:bg-gray-100 transition-opacity duration-300"
            >
              <Link
                href={`/product/${item.id}`}
                className="flex gap-1 items-center"
              >
                <p className="font-medium text-[12px] md:text-[14px] text-[#1D271F] flex items-center gap-2">
                  {`${item.categoryIcon} ${item.nameBn} `}
                  <span className="font-normal font-serif">
                    {`${toBanglaNumber(item.today)} টাকা/${unitBn[item.unit] || item.unit}`}
                  </span>
                </p>
                <p className="flex items-center text-[12px] md:text-[14px]">
                  {item.change.dir === "up" && (
                    <FaCaretUp className="text-red-600 text-[16px] md:text-[22px]" />
                  )}

                  {item.change.dir === "down" && (
                    <FaCaretDown className="text-green-600 text-[16px] md:text-[22px]" />
                  )}

                  {item.change.dir === "flat" && (
                    <span className="text-gray-600">-</span>
                  )}

                  <span
                    className={`font-semibold font-serif ${
                      item.change.dir === "up"
                        ? "text-red-600"
                        : item.change.dir === "down"
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {toBanglaNumber(item.change.pct)}%
                  </span>
                </p>
              </Link>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueeComponent;
