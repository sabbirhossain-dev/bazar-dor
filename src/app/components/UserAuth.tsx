"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import defaultUser from "../../../public/default-user.jpg";

const UserAuth = () => {
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

  return (
    <>
      {session ? (
        <>
          <div className="flex gap-3 items-center">
            <div>
              <Image
                src={session?.user.image || defaultUser}
                alt="user"
                height={20}
                width={20}
                className="h-10 w-auto rounded-xl"
              ></Image>
            </div>
            <h3>{session?.user.name}</h3>
            <button
              onClick={handleLogOut}
              className="bg-red-700 px-3 py-1 flex items-center rounded-md text-white cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-2 md:gap-5">
          <Link
            href="/sign-in"
            className="font-bold text-[12px] md:text-[14px] text-black px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="font-bold text-[12px] md:text-[14px] text-white bg-[#05893E] px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-900 transition-all duration-300"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </>
  );
};

export default UserAuth;
