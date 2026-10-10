// import ItemCard from "@/app/components/ItemCard";
import SortFunction from "@/app/components/SortFunction";
// import { IType } from "@/app/types/type";

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );
  const categoryData = await res.json();

  const categoryRes = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`,
  );

  const categoryItem = await categoryRes.json();
  console.log(categoryItem);

  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };

  // sorted card

  return (
    <div className="pb-20 px-4 sm:px-8 md:px-0">
      <div className="flex gap-2 items-center p-4 bg-white border border-gray-200 rounded-lg my-6">
        <p className="text-3xl">{categoryItem.icon}</p>
        <div>
          <h2 className="font-bold text-[24px] text-[#1D271F]">
            {categoryItem.nameBn}
          </h2>
          <p className="font-normal text-[14px] text-[#1D271F] opacity-70">{`${toBanglaNumber(categoryData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
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
  );
};

export default CategoryPage;
