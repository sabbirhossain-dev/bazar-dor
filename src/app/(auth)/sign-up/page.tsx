"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FaGithub, FaArrowLeft } from "react-icons/fa";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type FormErrors = {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "নাম লিখুন।";
    }

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

    // প্রোফাইল ছবির URL যাচাই
    if (image.trim()) {
      try {
        const imageUrl = new URL(image.trim());

        if (
          !["http:", "https:"].includes(imageUrl.protocol) ||
          !imageUrl.hostname.includes(".")
        ) {
          newErrors.image = "সঠিক ছবির URL দিন।";
        }
      } catch {
        newErrors.image = "সঠিক ছবির URL দিন।";
      }
    }
    // Password validation
    if (!password) {
      newErrors.password = "পাসওয়ার্ড লিখুন।";
    } else if (password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "অন্তত একটি বড় হাতের অক্ষর দিন (A-Z)।";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "অন্তত একটি ছোট হাতের অক্ষর দিন (a-z)।";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "অন্তত একটি সংখ্যা দিন (0-9)।";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      newErrors.password = "অন্তত একটি special character দিন (@, #, !)।";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড আবার লিখুন।";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "দুটি পাসওয়ার্ড মিলছে না।";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    const user = {
      name,
      email,
      image,
      password,
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
    });

    if (data) {
      toast.success("সফলভাবে সাইন আপ হয়েছে!");
      redirect("/");
    }
    if (error) {
      console.log("error");
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
          <h1 className="text-[22px] md:text-[24px] leading-8 font-bold tracking-tight">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-0.5 text-[12px] md:text-[13px] leading-5 text-[#849087]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-[15px] border border-[#DFE8DF] bg-[#FAFCFA] px-5 pt-5 pb-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-[12px] font-bold"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="যেমন: রহিম উদ্দিন"
                className={inputClass(!!errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>
              )}
            </div>

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

            {/* প্রোফাইল ছবির URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-1 block text-[12px] font-bold"
              >
                প্রোফাইল ছবি URL
                <span className="ml-1 text-xs font-normal text-gray-400">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                id="image"
                name="image"
                type="url"
                autoComplete="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setErrors((prev) => ({ ...prev, image: undefined }));
                }}
                placeholder="https://example.com/profile.jpg"
                className={inputClass(!!errors.image)}
              />

              {errors.image && (
                <p className="mt-1 text-[11px] text-red-600">{errors.image}</p>
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

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                  className={`${inputClass(!!errors.password)} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showPassword ? (
                    <IoEyeOutline size={16} className="cursor-pointer" />
                  ) : (
                    <IoEyeOffOutline size={16} className="cursor-pointer" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-[12px] font-bold"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }}
                  placeholder="আবার লিখুন"
                  className={`${inputClass(!!errors.confirmPassword)} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  aria-label={
                    showConfirmPassword
                      ? "নিশ্চিত পাসওয়ার্ড লুকান"
                      : "নিশ্চিত পাসওয়ার্ড দেখুন"
                  }
                >
                  {showConfirmPassword ? (
                    <IoEyeOutline size={16} className="cursor-pointer" />
                  ) : (
                    <IoEyeOffOutline size={16} className="cursor-pointer" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="h-[35px] w-full rounded-[7px] bg-[#07883F] text-[12px] font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.22)] transition hover:bg-[#067637] active:translate-y-px cursor-pointer"
            >
              অ্যাকাউন্ট তৈরি করুন
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
              <FcGoogle className="text-[13px]" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              onClick={handleSignInWithGithub}
              type="button"
              className="flex h-[34px] cursor-pointer items-center justify-center gap-1 rounded-[7px] border border-[#DFE7DF] text-[11px] font-semibold transition hover:bg-[#F0F5F0]"
            >
              <FaGithub className="text-[13px]" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-3 text-center text-[12px]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#07883F] hover:underline"
            >
              সাইন ইন করুন
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
