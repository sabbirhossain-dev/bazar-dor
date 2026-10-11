"use client";

import Image from "next/image";
import { authClient } from "../lib/auth-client";
import defaultUser from "../../../public/default-user2.jpg";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  // সেশন থেকে ইউজারের নাম ইনিশিয়াল স্টেটে সেট করা

  const handleUpdateUser = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    if (!userData.image || (userData.image as string).trim() === "") {
      delete userData.image;
    }
    console.log(userData);
    await authClient.updateUser({
      ...userData,
    });
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে লগআউট হয়েছে!");
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f3f5f2] flex items-center justify-center text-gray-600">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f5f2] p-6 md:p-12 text-gray-800 px-4 sm:px-8 md:px-0">
      <div className="w-full md:max-w-2xl mx-auto space-y-6">
        {/* হেডার সেকশন */}
        <div className="mb-8">
          <h1 className="text-[24px] font-bold text-[#1D271F]">
            আমার প্রোফাইল
          </h1>
          <p className="text-[14px] font-normal text-[#1D271F] opacity-70 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* ইউজার কার্ড (ইউজার প্রোফাইল ও সাইন আউট) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={session?.user?.image || defaultUser}
                alt={session?.user?.name || "User Avatar"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-[20px] font-semibold text-[#1D271F]">
                {session?.user?.name || "User Name"}
              </h2>
              <p className="text-[16px] font-normal text-[#1D271F] opacity-70">
                {session?.user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-base">←</span> সাইন আউট
          </button>
        </div>

        {/* তথ্য আপডেট সেকশন */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100/80 space-y-6">
          <h3 className="text-[18px] font-semibold text-[#1D271F]">তথ্য</h3>

          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleUpdateUser}
          >
            {/* ================= PROFILE IMAGE ================= */}

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                {/* Image URL */}
                <div className="w-full">
                  <label
                    htmlFor="image"
                    className="mb-2 block text-[14px] font-semibold text-[#1D271F]"
                  >
                    প্রোফাইল ছবি
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                  />

                  <p className="mt-1.5 text-xs text-gray-400">
                    একটি valid image URL দিন
                  </p>
                </div>
              </div>
            </div>

            {/* ================= NAME ================= */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[14px] font-semibold text-[#1D271F]"
              >
                আপনার নাম
              </label>

              <div className="relative">
                {/* User Icon */}
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                    />
                  </svg>
                </div>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10"
                />
              </div>
            </div>

            {/* ================= UPDATE BUTTON ================= */}

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/25 active:translate-y-0 active:scale-[0.99]"
            >
              আপডেট
              {/* প্রোফাইল
                করুন */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
