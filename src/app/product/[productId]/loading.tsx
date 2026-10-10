import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen bg-[#F0F5F0] px-3 pt-4 pb-10 font-bangla sm:px-5">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-[#DCE5DC]" />
          <div className="h-3 w-2 rounded bg-[#DCE5DC]" />
          <div className="h-3 w-10 rounded bg-[#DCE5DC]" />
          <div className="h-3 w-2 rounded bg-[#DCE5DC]" />
          <div className="h-3 w-24 rounded bg-[#DCE5DC]" />
        </div>

        {/* Product Header Skeleton */}
        <section className="mb-3 flex flex-col justify-between gap-4 rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="h-[43px] w-[43px] shrink-0 rounded-[10px] bg-[#E4EBE4]" />

            <div className="space-y-2">
              <div className="h-4 w-36 rounded bg-[#DCE5DC]" />
              <div className="h-3 w-20 rounded bg-[#E5ECE5]" />
              <div className="h-3 w-52 max-w-full rounded bg-[#E5ECE5]" />
            </div>
          </div>

          <div className="flex min-h-[82px] min-w-[74px] flex-col items-center justify-center gap-2 rounded-[10px] bg-[#F0F5F0] px-3 py-2">
            <div className="h-3 w-12 rounded bg-[#DCE5DC]" />
            <div className="h-6 w-10 rounded bg-[#DCE5DC]" />
            <div className="h-3 w-14 rounded bg-[#E5ECE5]" />
            <div className="h-3 w-10 rounded bg-[#E5ECE5]" />
          </div>
        </section>

        {/* Main Content Skeleton */}
        <section className="rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:p-2.5">
          {/* Summary Heading */}
          <div className="mb-3 h-3 w-28 rounded bg-[#DCE5DC]" />

          {/* Price Summary Cards */}
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[55px] rounded-[10px] border border-[#E4EBE4] px-3 py-2"
              >
                <div className="mb-2 h-3 w-16 rounded bg-[#E5ECE5]" />
                <div className="mb-1 h-4 w-20 rounded bg-[#DCE5DC]" />
                <div className="h-2.5 w-32 max-w-full rounded bg-[#E5ECE5]" />
              </div>
            ))}
          </div>

          {/* Table Heading */}
          <div className="mb-3 h-3 w-36 rounded bg-[#DCE5DC]" />

          {/* Table Skeleton */}
          <div className="overflow-hidden rounded-[8px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-3 border-y border-[#E6ECE6] px-2 py-3">
              {["w-10", "w-12", "w-14", "w-14", "w-8"].map((width, index) => (
                <div
                  key={index}
                  className={`h-3 rounded bg-[#DCE5DC] ${width} ${
                    index >= 2 ? "ml-auto" : ""
                  }`}
                />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: 12 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-5 items-center gap-3 border-b border-[#DDE5DD] px-2 py-[9px]"
              >
                <div
                  className="h-3 rounded bg-[#E5ECE5]"
                  style={{ width: `${55 + (rowIndex % 3) * 10}%` }}
                />
                <div className="h-3 w-12 rounded bg-[#E5ECE5]" />
                <div className="ml-auto h-3 w-12 rounded bg-[#E5ECE5]" />
                <div className="ml-auto h-3 w-12 rounded bg-[#E5ECE5]" />
                <div className="ml-auto h-3 w-12 rounded bg-[#DCE5DC]" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default loading;
