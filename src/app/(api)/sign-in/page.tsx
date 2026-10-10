"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";


export default function SignInPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = Object.fromEntries(
      formData.entries()
    ) as Record<string, string>;

    console.log(data);

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log("Response:", resData);
    console.log("Error:", error);

    if (error) {
  toast.error("Email অথবা password ভুল!");
  return;
}

   toast.success("Login successful!");
  };
  const handelGoogleSignIn = async() =>{
     const data = await signIn.social({
    provider: "google",
    callbackURL: "/",
  });
  }

    const handelGithubSignIn = async() =>{
    const data = await signIn.social({
        provider: "github",
    callbackURL: "/",

    })
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1] flex flex-col items-center justify-center p-4 text-slate-800">
      {/* Title Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          সাইন ইন
        </h1>

        <p className="text-slate-600 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Card Box */}
      <div className="card w-full max-w-md bg-white shadow-sm border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label pb-1">
              <span className="label-text font-semibold text-slate-700">
                ইমেইল
              </span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Example@gmail.com"
              className="input input-bordered w-full bg-slate-50 focus:bg-white text-slate-800 border-slate-300 focus:border-emerald-600 focus:outline-none rounded-xl"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control w-full">
            <label className="label pb-1">
              <span className="label-text font-semibold text-slate-700">
                পাসওয়ার্ড
              </span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••••••"
              className="input input-bordered w-full bg-slate-50 focus:bg-white text-slate-800 border-slate-300 focus:border-emerald-600 focus:outline-none rounded-xl"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-semibold text-base normal-case mt-2"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-xs text-slate-400 my-6">
          অথবা
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
          onClick={handelGoogleSignIn}
            type="button"
            className="btn btn-outline border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 rounded-xl normal-case h-auto py-2.5 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl shrink-0" />

            <span className="text-xs leading-tight text-left">
              Google দিয়ে
              <br />
              চালিয়ে যান
            </span>
          </button>

          <button
          onClick={handelGithubSignIn}
            type="button"
            className="btn btn-outline border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 rounded-xl normal-case h-auto py-2.5 flex items-center justify-center gap-2"
          >
            <FaGithub className="text-xl text-slate-800 shrink-0" />

            <span className="text-xs leading-tight text-left">
              GitHub দিয়ে
              <br />
              চালিয়ে যান
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 text-sm text-slate-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-emerald-600 hover:underline font-semibold"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-700 text-sm hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
 
