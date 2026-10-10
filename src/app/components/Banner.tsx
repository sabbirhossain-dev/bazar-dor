import Image from "next/image";
import bannerImg from "../../../public/bazar-hero.png";
const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="flex flex-col md:flex-row justify-between p-5 gap-5 bg-white border border-gray-200 rounded-xl">
      <div className="">
        <p className="font-medium font-serif text-[12px] md:text-[14px] text-[#05893E] F]  bg-[#ddf7e8] p-2 pt-2.5 inline rounded-2xl px-3">
          {date}
        </p>
        <h1 className="font-bold text-[26px] md:text-[36px] text-[#1D271F] pt-3">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="font-normal text-[14px] md:text-[16px] text-[#1D271F] opacity-70 w-auto md:w-145 pt-4 pb-7">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button>
          <a
            href="#all"
            className="font-semibold text-[13px] md:text-[16px] text-[#F3FBF4] px-3 md:px-4 py-2 pb-1.5 bg-[#047F39] rounded-lg"
          >
            সব পণ্য দেখুন
          </a>
        </button>
      </div>

      <div>
        <Image
          src={bannerImg}
          alt="banner-img"
          width={400}
          height={400}
          className="w-75 h-auto"
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
