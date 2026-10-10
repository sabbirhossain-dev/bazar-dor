import React from "react";

const Loading = () => {
  return (
    <main className="flex min-h-screen flex-col items-center mt-20 bg-[#F7FAF7]">
      {" "}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D5EBDD] border-t-[#07863F]" />
      <p className="mt-4 text-sm font-medium text-gray-600">
        {" "}
        Loading, please wait...{" "}
      </p>{" "}
    </main>
  );
};

export default Loading;
