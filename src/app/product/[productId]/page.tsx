import { IType } from "@/app/types/type";
import Link from "next/link";

type Props = {
  params: Promise<{ productId: string; categoryId: string }>;
};

const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const price = (value: number) => `${toBn(value)} টাকা`;

export default async function ProductDetailsPage({ params }: Props) {
  const { productId } = await params;

  const res = await fetch(
    // `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] p-8 font-bangla text-center flex items-center justify-center">
        পণ্যটি খুঁজে পাওয়া যায়নি।
      </main>
    );
  }

  const product: IType = await res.json();

  const categoryId = product.category;

  console.log(productId, categoryId);

  if (!product || !Array.isArray(product.markets)) {
    return (
      <main className="min-h-screen bg-[#F0F5F0] p-8 font-bangla text-center">
        পণ্যের তথ্য পাওয়া যায়নি।
      </main>
    );
  }

  const markets = product.markets;
  const lowest = Math.min(...markets.map((m) => m.min));
  const highest = Math.max(...markets.map((m) => m.max));
  const average =
    markets.length > 0
      ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
        markets.length
      : 0;

  const isUp = product.change.dir === "up";

  const summaries = [
    {
      title: "সর্বনিম্ন দাম",
      value: lowest,
      color: "#079447",
      description: "সকল বাজারের সর্বনিম্ন দর",
    },
    {
      title: "সর্বোচ্চ দাম",
      value: highest,
      color: "#E54848",
      description: "সকল বাজারের সর্বোচ্চ দর",
    },
    {
      title: "গড় দাম",
      value: Math.round(average * 10) / 10,
      color: "#07883F",
      description: "বাজারের গড় মূল্য",
    },
  ];

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
    <main className="min-h-screen bg-[#F0F5F0] px-3 pt-4 pb-10 md:pb-30 font-bangla text-[#27332B] sm:px-5">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-[12px] md:text-[14px] text-[#1D271F] font-normal">
          <Link href="/" className="hover:text-[#07883F]">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${categoryId}`}
            // href={`/`}
            className="hover:text-[#07883F]"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-[#29352D]">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="mb-3 flex flex-col justify-between items-center gap-4 rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-[67px] w-[67px] md:h-[77px] md:w-[77px] shrink-0 items-center justify-center rounded-[10px] bg-[#F0F4F0] text-[20px] text-[26px] p-4">
              {product.image}
            </div>

            <div>
              <h1 className="text-[20px] md:text-[30px] text-[#1D271F] leading-6 font-bold pt-2">
                {product.nameBn}
              </h1>
              <p className="text-[12px] md:text-[14px] text-[#1D271F] font-normal opacity-70 py-1">
                প্রতি {unitBn[product.unit]}
                {" · "}
                {product.categoryNameBn}
              </p>
              <p className="text-[12px] md:text-[14px] font-serif text-[#1D271F] font-normal">
                গতকালের তুলনায় আজকের দামের পরিবর্তন: {toBn(product.yesterday)} →{" "}
                {toBn(product.today)} টাকা
              </p>
            </div>
          </div>

          <div className="rounded-[10px] bg-[#F0F5F0] px-3 py-2 text-center w-full md:w-32">
            <p className="text-[12px] md:text-[14px] text-[#1D271F] opacity-70">
              আজকের দাম
            </p>
            <p className="text-[22px] md:text-[30px] text-[#1D271F] font-bold">
              {toBn(product.today)}
            </p>
            <p className="text-[12px] md:text-[14px] text-[#1D271F] opacity-70">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
            <p
              className={`mt-1 text-[12px] md:text-[14px] font-semibold ${
                isUp ? "text-[#D03739]" : "text-[#07883F]"
              }`}
            >
              {isUp ? "▲" : "▼"} {toBn(Math.abs(product.change.pct))}%
            </p>
          </div>
        </section>

        {/* Price Summary and Market Table */}
        <section className="rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:p-4">
          <h2 className="mb-2 text-[16px] md:text-[18px] text-[#1D271F] font-semibold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {summaries.map((item) => (
              <div
                key={item.title}
                className="min-h-[55px] rounded-[10px] border border-[#E4EBE4] p-4"
              >
                <p className="text-[11px] md:text-[12px] text-[#1D271F]">
                  {item.title}
                </p>
                <p
                  className="text-[20px] md:text-[24px] leading-5 font-bold py-1"
                  style={{ color: item.color }}
                >
                  {price(item.value)}
                </p>
                <p className="text-[11px] md:text-[12px] text-[#1D271F]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mb-2 text-[11px] font-semibold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[8px]">
            <table className="w-full min-w-[540px] border-collapse text-left text-[10px]">
              <thead>
                <tr className="border-y border-[#E6ECE6] text-[#657168]">
                  <th className="px-2 py-3 font-bold text-[14px] text-[#1D271F] opacity-70">
                    বাজার
                  </th>
                  <th className="px-2 py-3 font-bold text-[14px] text-[#1D271F] opacity-70">
                    বিভাগ
                  </th>
                  <th className="px-2 py-3 text-right font-bold text-[14px] text-[#1D271F] opacity-70">
                    সর্বনিম্ন
                  </th>
                  <th className="px-2 py-3 text-right font-bold text-[14px] text-[#1D271F] opacity-70">
                    সর্বোচ্চ
                  </th>
                  <th className="px-2 py-3 text-right font-bold text-[14px] text-[#1D271F] opacity-70">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market) => (
                  <tr
                    key={`${market.market}-${market.division}`}
                    className="border-b border-[#DDE5DD] transition odd:bg-white even:bg-gray-100 hover:bg-[#EAF2EA]"
                  >
                    <td className="whitespace-nowrap px-2 py-3 font-medium text-[#1D271F] text-[12px] md:text-[14px]">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-2 py-3 font-regular text-[#1D271F] text-[12px] md:text-[14px]">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-2 py-3 text-right font-regular font-serif text-[#1D271F] text-[12px] md:text-[14px]">
                      {price(market.min)}
                    </td>

                    <td className="whitespace-nowrap px-2 py-3 text-right font-regular font-serif text-[#1D271F] text-[12px] md:text-[14px]">
                      {price(market.max)}
                    </td>

                    <td className="whitespace-nowrap px-2 py-3 text-right font-serif font-semibold text-[#1D271F] text-[12px] md:text-[14px]">
                      {price((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
