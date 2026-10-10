import Link from "next/link";

interface ICategory {
  id: string;
  nameBn: string;
  icon: string;
}

const NavCategories = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();

  return (
    <nav className="py-3 bg-white border border-gray-200 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto">
        <ul className="flex gap-10 px-10">
          {data.map((item: ICategory) => (
            <Link href={`/category/${item.id}`} key={item.id}>
              <li className="flex items-center gap-1 font-bold text-[15px] cursor-pointer">
                <span>{item.icon}</span>
                <h3 className="font-semibold text-[12px] text-[1D271F]">
                  {item.nameBn}
                </h3>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavCategories;
