"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/asste/logo-icon.png";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import MenuCategories from "./MenuCategories";

const Navbar = () => {
  const router = useRouter();

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { data: session } = useSession();

  const hamdelSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/80 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo with Green BG & Dynamic Bangla Date */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center p-1.5 shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Image
              src={logo}
              alt="Bazar Dor Logo"
              width={32}
              height={32}
              className="object-contain brightness-0 invert"
            />
          </Link>

          <div className="flex flex-col">
            <Link
              href="/"
              className="text-lg font-extrabold text-slate-900 leading-tight"
            >
              বাজার দর
            </Link>

            <span className="text-xs text-slate-500 font-medium">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Right Side: Auth Buttons */}
        {session?.user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">
              {session?.user?.name}
            </span>

            <button
              onClick={hamdelSignOut}
              className=" btn btn-sm btn-outline border-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-slate-600 rounded-lg font-medium normal-case"
            >
              সাইন আউট
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="btn btn-ghost btn-sm text-slate-700 hover:bg-slate-100 font-semibold normal-case rounded-lg"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="btn btn-emerald btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none font-semibold normal-case rounded-lg px-4"
            >
              সাইন আপ
            </Link>
          </div>
        )}

      </div>
      <MenuCategories></MenuCategories>
    </header>
  );
};

export default Navbar;