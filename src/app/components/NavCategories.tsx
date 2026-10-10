import Link from "next/link";

interface ICategory {
  id: string;
  nameBn: string;
  icon: string;
}

const NavCategories = ({ data }: { data: ICategory[] }) => {
  return (
    <nav className="hidden md:flex border-y border-gray-200 bg-white py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-0">
        <ul className="flex justify-start gap-10 px-10">
          {data.map((item: ICategory) => (
            <li key={item.id}>
              <Link
                href={`/category/${item.id}`}
                className="flex items-center gap-1 text-[15px] font-bold"
              >
                <span>{item.icon}</span>
                <span className="text-[12px] font-semibold text-[#1D271F]">
                  {item.nameBn}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavCategories;
