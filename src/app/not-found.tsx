"use client";

import Link from "next/link";

const NotfoundPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7FAF7] px-4 text-center">
      {" "}
      <h1 className="text-5xl font-bold text-[#07863F]">404</h1>
      <h2 className="mt-3 text-2xl font-bold text-gray-800">
        {" "}
        Page Not Found!{" "}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {" "}
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।{" "}
      </p>
      <Link
        href="/"
        className="mt-5 rounded-lg bg-[#07863F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#066D34]"
      >
        {" "}
        হোম পেজে ফিরে যান{" "}
      </Link>{" "}
    </main>
  );
};

export default NotfoundPage;
