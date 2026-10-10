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
  console.log(categoryData);

  console.log("Category ID:", categoryId);

  return <div></div>;
};

export default CategoryPage;
