import React from "react";

const CategoryLoading = () => {
  return (
    <div>
      return (
      <main className="min-h-screen bg-[#F0F5F0] px-4 pb-20 sm:px-8 md:px-0 animate-pulse">
        <div className="mx-auto max-w-7xl">
          {/* Category header skeleton */}
          <div className="my-6 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-200" />

            <div className="flex-1 space-y-3">
              <div className="h-6 w-40 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
            </div>
          </div>

          {/* Sorting section skeleton */}
          <div className="mb-5 flex items-center justify-between gap-3 rounded-lg bg-white p-4">
            <div className="h-5 w-28 rounded bg-gray-200" />
            <div className="h-10 w-36 max-w-[50%] rounded-lg bg-gray-200" />
          </div>

          {/* Product cards skeleton */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* Product image */}
                <div className="aspect-square w-full bg-gray-100 h-20" />
              </div>
            ))}
          </div>
        </div>
      </main>
      );
    </div>
  );
};

export default CategoryLoading;
