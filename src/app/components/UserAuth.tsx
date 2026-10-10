"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import defaultUser from "../../../public/default-user.jpg";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";

const UserAuth = () => {
  const [userToggle, setUserToggle] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  // console.log("from user", session);
  const router = useRouter();

  if (isPending) {
    return "Loading...";
  }

  const handleLogOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে লগআউট হয়েছে!");
            router.replace("/sign-in");
            router.refresh();
          },
          onError: () => {
            toast.error("লগআউট করা যায়নি!");
          },
        },
      });
    } catch {
      toast.error("লগআউট করার সময় সমস্যা হয়েছে!");
    }
  };

  const handleUserButton = () => {
    setUserToggle(!userToggle);
  };

  return (
    <>
      {session ? (
        <>
          <div className="flex gap-2 items-center relative">
            <div>
              <Image
                src={session?.user.image || defaultUser}
                alt="user"
                height={20}
                width={20}
                className="h-8 md:h-10 w-auto rounded-xl"
              ></Image>
            </div>
            <h3 className="hidden md:block">{session?.user.name}</h3>
            <button
              onClick={handleUserButton}
              className="cursor-pointer opacity-80"
            >
              {userToggle ? <FaCaretUp size={18} /> : <FaCaretDown size={18} />}
            </button>

            {/* user toggle */}
            {userToggle && (
              <div className="absolute right-0 top-9 md:top-11 z-100 w-max min-w-48 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-.5">
                    <p className=" text-[14px] font-semibold text-[#1D271F]">
                      {session?.user.name}
                    </p>
                    <p className=" text-[12px] font-normal text-[#1D271F] pb-1">
                      {session?.user.email}
                    </p>
                  </div>
                  <Link href="/profile">
                    <p className="px-3 py-1 flex items-center rounded-md cursor-pointer text-[14px] font-normal text-[#1D271F] hover:bg-gray-200 transition-colors duration-300">
                      👤 আমার প্রোফাইল
                    </p>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="px-3 py-1 flex items-center rounded-md text-red-600 cursor-pointer text-[14px] font-normal gap-1 hover:bg-red-100 transition-colors duration-300"
                  >
                    <span>
                      <IoReturnDownBack />
                    </span>
                    সাইন আউট
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex gap-2 md:gap-5">
          <Link
            href="/sign-in"
            className="font-bold text-[10px] md:text-[14px] text-black px-2 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="font-bold text-[10px] md:text-[14px] text-white bg-[#05893E] px-2 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-900 transition-all duration-300"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </>
  );
};

export default UserAuth;
