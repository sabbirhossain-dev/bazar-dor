"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FaGoogle, FaGithub, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: session, isPending } = useSession();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Email validation
    const normalizedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      newErrors.email = "ইমেইল লিখুন।";
    } else if (
      normalizedEmail.length > 254 ||
      !emailRegex.test(normalizedEmail)
    ) {
      newErrors.email = "সঠিক ইমেইল অ্যাড্রেস লিখুন।";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        console.error("Sign in error:", error);
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");

        redirect("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      // toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const inputClass = (hasError: boolean) =>
    `h-[34px] w-full rounded-[8px] border bg-transparent px-2.5 text-[12px] outline-none transition ${
      hasError
        ? "border-red-500 focus:border-red-600"
        : "border-[#DFE7DF] focus:border-[#07863F]"
    }`;

  // sign in with google
  const handleSignInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      // callbackURL: "/",
    });
    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    }
  };

  //signin with github
  const handleSignInWithGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      // callbackURL: "/",
    });
    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] px-4 pt-9 pb-6 font-bangla text-[#29352D]">
      <div className="mx-auto w-full max-w-[348px]">
        <div className="mb-5 text-center">
          <h1 className="text-[22px] leading-8 font-bold tracking-tight">
            সাইন ইন
          </h1>
          <p className="mt-0.5 text-[12px] leading-5 text-[#849087]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।{" "}
          </p>
        </div>

        <div className="rounded-[15px] border border-[#DFE8DF] bg-[#FAFCFA] px-5 pt-5 pb-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[12px] font-bold"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[12px] font-bold"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    password: undefined,
                    confirmPassword: undefined,
                  }));
                }}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass(!!errors.password)}
              />
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="h-[35px] w-full rounded-[7px] bg-[#07883F] text-[12px] font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.22)] transition hover:bg-[#067637] active:translate-y-px"
            >
              সাইন ইন
            </button>
          </form>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DFE6DF]" />
            <span className="text-[11px] text-[#657168]">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE6DF]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSignInWithGoogle}
              type="button"
              className="flex cursor-pointer h-[34px] items-center justify-center gap-1 rounded-[7px] border border-[#DFE7DF] text-[11px] font-semibold transition hover:bg-[#F0F5F0]"
            >
              <FaGoogle className="text-[13px] text-[#4285F4]" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              onClick={handleSignInWithGithub}
              type="button"
              className="flex cursor-pointer h-[34px] items-center justify-center gap-1 rounded-[7px] border border-[#DFE7DF] text-[11px] font-semibold transition hover:bg-[#F0F5F0]"
            >
              <FaGithub className="text-[13px]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-3 text-center text-[12px]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#07883F] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-4 flex items-center justify-center gap-1 text-[12px] text-[#8A968D] transition hover:text-[#07883F]"
        >
          <FaArrowLeft className="text-[10px]" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
