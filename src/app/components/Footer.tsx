import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto w-full bg-white py-6 ">
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-between items-center">
          <p className="font-normal text-[14px] text-[#1D271F]">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p className="font-normal text-[14px] text-[#1D271F]">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
