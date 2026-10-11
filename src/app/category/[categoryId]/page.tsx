// import ItemCard from "@/app/components/ItemCard";
import SortFunction from "@/app/components/SortFunction";
import Link from "next/link";
import { notFound } from "next/navigation"; // import { IType } from "@/app/types/type";

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    // `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
    // `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  const categoryData = await res.json();

  const categoryRes = await fetch(
    // `https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`,
    // `https://api.abcz.workers.dev/api/bazardor/categories/${categoryId}`,
    `https://openapi.programming-hero.com/api/bazardor/categories/${categoryId}`,
  );

  const categoryItem = await categoryRes.json();

  if (!categoryId) {
    notFound();
  }
  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };

  // sorted card

  return (
    <>
      {categoryData.length === 0 ? (
        <>
          <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FAF7] px-4 text-center">
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
          </div>
        </>
      ) : (
        <div className="pb-20 px-4 sm:px-8 md:px-0">
          <div className="flex gap-2 items-center p-4 bg-white border border-gray-200 rounded-lg my-6">
            <p className="text-3xl">{categoryItem.icon}</p>
            <div>
              <h2 className="font-bold text-[18px] md:text-[24px] text-[#1D271F]">
                {categoryItem.nameBn}
              </h2>
              <p className="font-normal text-[12px] md:text-[14px] text-[#1D271F] opacity-70">{`${toBanglaNumber(categoryData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
            </div>
          </div>

          {/* sorting */}
          <SortFunction data={categoryData} />

          {/* card items */}
          {/* <h3 className="font-normal text-[14px] text-[#1D271F] py-2 opacity-70">{`মোট ${toBanglaNumber(categoryData.length)}টি পণ্য দেখানো হচ্ছে`}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {categoryData.map((item: IType) => (
          <ItemCard key={item.id} data={item} />
        ))}
      </div> */}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
