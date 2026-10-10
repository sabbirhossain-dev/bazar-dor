import { IType } from "../types/type";

const ItemCard = ({ data }: { data: IType }) => {
  const isDown = data.change.dir === "down";

  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };
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

  return (
    <div className="w-full rounded-md border border-[#E0E8E1] bg-[#FFFFFF] p-4 hover:shadow-md hover:border-green-300 transition-all duration-300">
      {/* Top section */}
      <div className="flex items-center gap-3">
        {/* Item icon */}
        <div className="flex justify-center items-center p-2 px-3 rounded-xl bg-[#F0F4F0] text-[25px]">
          {data.image}
        </div>

        {/* Item name */}
        <div className="min-w-0">
          <h3 className="text-[16px] leading-[21px] font-semibold text-[#1D271F]">
            {data.nameBn}
          </h3>

          <p className="text-[12px] leading-[16px] text-[#1D271F]">
            প্রতি {unitBn[data.unit] || data.unit}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="mb-0.5 text-[12px] leading-[14px] text-[#1D271F]">
            আজকের দাম
          </p>

          <p className="text-[20px] leading-[20px] font-bold text-[#1D271F]">
            {toBanglaNumber(data.today)}{" "}
            <span className="text-[14px] font-medium">টাকা</span>
          </p>
        </div>

        {/* Price change badge */}
        <div
          className={`mb-0.5 flex items-center gap-1 rounded-full px-2 py-1.5 text-[10px] leading-none font-bold ${
            isDown
              ? "bg-[#F0F5F0] text-[#1A9951]"
              : data.change.dir === "up"
                ? "bg-[#F0F5F0] text-[#D03739]"
                : "bg-[#F0F5F0] text-[#68736B]"
          }`}
        >
          <span className="">
            {isDown ? "▼" : data.change.dir === "up" ? "▲" : "●"}
          </span>
          <span>{toBanglaNumber(Math.abs(data.change.pct).toFixed(1))}%</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
